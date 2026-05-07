import { hash, verifyHash } from "../hash";
import { test, describe, expect } from "@jest/globals";

test('testing hash, making a hash and verifying it', async () => {
  const text = '123';
  const hash_text = await hash(text);
  expect(await verifyHash(hash_text, text)).toBe(true);
});
