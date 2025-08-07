import basex from 'base-x'
import { randomBytes, createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const bs62 = basex('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

const decode = (encodedUuid: string) => {
  return bs62.decode(encodedUuid);
}

/**
 * Generates a base62 encoded UUID
 * @param length - Number of random bytes to generate (default: 8)
 * @returns A base62 encoded string
 */
const generateBase62UUID = (length: number = 8): string => {
  const bytes = randomBytes(length);
  return bs62.encode(bytes);
}

/**
 * Generates a base62 UUID from a standard UUID string
 * @param uuid - Standard UUID string (e.g., from crypto.randomUUID())
 * @returns A base62 encoded string
 */
const uuidToBase62 = (uuid?: string): string => {
  const uuidStr = uuid || uuidv4();
  // Remove hyphens and convert hex to buffer
  const hex = uuidStr.replace(/-/g, '');
  const buffer = Buffer.from(hex, 'hex');
  return bs62.encode(buffer);
}

/**
 * Generates a deterministic base62 ID from input string
 * Useful for consistent short URLs for the same input
 * @param input - Input string to hash
 * @param length - Number of bytes from hash to use (default: 6)
 * @returns A base62 encoded string
 */
const generateDeterministicBase62 = (input: string, length: number = 6): string => {
  const hash = createHash('sha256').update(input).digest();
  const truncated = hash.subarray(0, length);
  return bs62.encode(truncated);
}

/**
 * Generates a time-based base62 UUID with random component
 * Provides some ordering while maintaining uniqueness
 * @param randomBytes - Number of random bytes to append (default: 4)
 * @returns A base62 encoded string
 */
const generateTimeBasedBase62UUID = (randomBytesLength: number = 4): string => {
  const timestamp = Buffer.alloc(6);
  const now = Date.now();
  timestamp.writeUIntBE(now, 0, 6);
  
  const random = randomBytes(randomBytesLength);
  const combined = Buffer.concat([timestamp, random]);
  
  return bs62.encode(combined);
}

export { 
  decode, 
  generateBase62UUID, 
  uuidToBase62, 
  generateDeterministicBase62, 
  generateTimeBasedBase62UUID 
};