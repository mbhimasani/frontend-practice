'use client';

import Text from "@/components/Text";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const TinyUrl = () => {
  const [url, setUrl] = useState<string>('');
  const [encodedUrl, setEncodedUrl] = useState<string>('');
  const [decodedUrl, setDecodedUrl] = useState<string>('');

  const { mutateAsync: encodeUrl, isPending: isEncoding, data: encodeData } = useMutation({
    mutationFn: (url: string) => {
      return fetch('/api/tinyurl', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
    }
  });
  const { mutateAsync: decodeUrl, isPending: isDecoding, data: decodeData } = useMutation({
    mutationFn: (shortUrl: string) => {
      return fetch(`/api/tinyurl?shortUrl=${shortUrl}`, {
        method: 'GET',
      });
    }
  });
  const handleEncode = async () => {
    const res = await encodeUrl(url);
    if (res.ok) {
      const data = await res.json();
      setEncodedUrl(data.shortUrl);
    }
  }
  const handleDecode = async () => {
    const res = await decodeUrl(url);
    if (res.ok) {
      const data = await res.json();
      setDecodedUrl(data.originalUrl);
    }
  }
  
  return (
    <div className="flex flex-col gap-2">
      <Text type="title">TinyUrl</Text>
      <Input
        type="text"
        placeholder="Enter a URL to encode/decode"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isEncoding || isDecoding}
      />
      <div className="flex gap-2">
        <Button onClick={handleEncode} disabled={isEncoding || !url}>Encode</Button>
        <Button onClick={handleDecode} disabled={isDecoding || !url}>Decode</Button>
      </div>
      <div className="flex flex-col gap-2">
        {isEncoding ? <Text type="subtitle">Encoding...</Text> : !encodeData?.ok ? <Text type="subtitle">Error: {encodeData?.statusText}</Text> : <Text type="subtitle">Encoded URL: {encodedUrl}</Text>}
        {isDecoding ? <Text type="subtitle">Decoding...</Text> : !decodeData?.ok ? <Text type="subtitle">Error: {decodeData?.statusText}</Text> : <Text type="subtitle">Decoded URL: {decodedUrl}</Text>}
      </div>
    </div>
  )
}


export default TinyUrl;