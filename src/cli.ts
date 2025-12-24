#!/usr/bin/env node
import fetchStatusCodes, { fetchStatusCodeClasses } from 'fetch-status-codes';
import { dump, type DumpOptions } from 'js-yaml';
import meow from 'meow';
import { getHelpTextAndOptions } from 'meowtastic';

const cli = meow(
  ...getHelpTextAndOptions({
    description: 'Fetch the HTTP status codes from the IANA registry.',
    flags: {
      classes: {
        description: 'Fetch the HTTP status code classes instead of the status codes.',
        default: false,
        shortFlag: 'c',
        type: 'boolean'
      },
      doNotResolveRedirects: {
        description: 'Do not resolve URL redirects.',
        default: false,
        shortFlag: 'd',
        type: 'boolean'
      },
      yaml: {
        description: 'Display the HTTP status codes (or classes) as YAML instead of JSON.',
        default: false,
        shortFlag: 'y',
        type: 'boolean'
      }
    },
    importMeta: import.meta
  })
);

const dumpOptions: DumpOptions = { lineWidth: -1 };

if (cli.flags.classes) {
  const classes = await fetchStatusCodeClasses();

  console.log(cli.flags.yaml ? dump(classes, dumpOptions) : classes);
} else {
  const resolveRedirects = !cli.flags.doNotResolveRedirects;
  const codes = await fetchStatusCodes({ resolveRedirects });

  if (cli.flags.yaml) {
    // We use `console.log` here because using `console.dir` prints the raw string output. That
    // includes quotes, concatenation operators, new line characters, etc.
    console.log(dump(codes, dumpOptions));
  } else {
    // We use `console.dir` here because the status codes are nested too deep for `console.log`.
    console.dir(codes, { depth: null });
  }
}
