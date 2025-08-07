import { NextResponse } from "next/server";
import { generateBase62UUID } from "../../(leetcode)/tinyurl/utils";
import fs from "fs";
import path from "path";

type DataSchema = {
  originalUrl: string;
  encodedUrl: string;
  uuid: string;
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    // check if the input is valid
    if (!url) {
      return NextResponse.json({ error: 'Missing input' }, { status: 400, statusText: 'Unable to encode URL' });
    }
    
    // Basic URL validation
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400, statusText: 'Unable to encode URL' });
    }

    if (url.startsWith('http://tinyurl.com/')) {
      return NextResponse.json({ error: 'Url already encoded' }, { status: 400, statusText: 'Unable to encode URL' });
    }

    const dataFilePath = path.join(process.cwd(), 'src/app/data/tinyurl.json');
    
    // Read existing data
    let tinyUrlData: DataSchema[] = [];
    try {
      const data = await fs.promises.readFile(dataFilePath, 'utf8');
      tinyUrlData = JSON.parse(data) as DataSchema[];
    } catch {
      // File doesn't exist or is empty, start with empty array
      console.log('Creating new data file or file was empty');
    }

    // Check if URL is already saved
    const existingEntry = tinyUrlData.find((item: DataSchema) => item.originalUrl === url);
    if (existingEntry) {
      return NextResponse.json({ 
        shortUrl: existingEntry.encodedUrl,
        originalUrl: url,
        uuid: existingEntry.uuid
      });
    }

    // Generate a new base62 UUID
    const uuid = generateBase62UUID(6); // 6 bytes for shorter URLs
    
    // Create new data entry
    const newData: DataSchema = {
      originalUrl: url,
      encodedUrl: `http://tinyurl.com/${uuid}`,
      uuid: uuid,
    };

    // Add to data array
    tinyUrlData.push(newData);

    // Save updated data
    await fs.promises.writeFile(
      dataFilePath, 
      JSON.stringify(tinyUrlData, null, 2), 
      'utf8'
    );

    return NextResponse.json({ 
      shortUrl: newData.encodedUrl,
      originalUrl: url,
      uuid: uuid
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, statusText: 'Unable to encode URL' });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const shortUrl = searchParams.get('shortUrl');

    if (!shortUrl) {
      return NextResponse.json({ error: 'Short code is required' }, { status: 400, statusText: 'Unable to decode URL', });
    }

    // check if the shortUrl is valid
    if (!shortUrl.startsWith('http://tinyurl.com/')) {
      return NextResponse.json({ error: 'Invalid short URL' }, { status: 400, statusText: 'Unable to decode URL' });
    }

    const dataFilePath = path.join(process.cwd(), 'src/app/data/tinyurl.json');
    
    // Read existing data
    let tinyUrlData: DataSchema[] = [];
    try {
      const data = await fs.promises.readFile(dataFilePath, 'utf8');
      tinyUrlData = JSON.parse(data) as DataSchema[];
    } catch {
      return NextResponse.json({ error: 'No data found' }, { status: 404, statusText: 'Unable to decode URL' });
    }

    const shortCode = shortUrl.split('/').pop();
    // Find the original URL
    const entry = tinyUrlData.find((item: DataSchema) => item.uuid === shortCode);
    
    if (!entry) {
      return NextResponse.json({ error: 'Short URL not found' }, { status: 404, statusText: 'Unable to decode URL' });
    }

    return NextResponse.json({ 
      originalUrl: entry.originalUrl,
      shortUrl: entry.encodedUrl,
      uuid: entry.uuid
    });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500, statusText: 'Unable to decode URL' });
  }
}