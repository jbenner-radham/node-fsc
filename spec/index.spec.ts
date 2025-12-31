import { yamlStringify } from '../src/index.js';
import { describe, expect, it } from 'vitest';

describe('yamlStringify', () => {
  it('is a function', () => {
    expect(yamlStringify).toBeTypeOf('function');
  });

  it('returns a string', () => {
    expect(yamlStringify({ hello: 'world' })).toBeTypeOf('string');
  });
});
