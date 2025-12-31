import { dump } from 'js-yaml';

export function yamlStringify(value: unknown): string {
  return dump(value, { lineWidth: -1 });
}
