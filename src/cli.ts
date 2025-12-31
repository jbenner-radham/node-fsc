#!/usr/bin/env node
import { yamlStringify } from './index.js';
import fetchStatusCodes, { fetchStatusCodeClasses } from 'fetch-status-codes';
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
      resolveRedirects: {
        description: 'Resolve URL redirects and add a section hash to the URL as well if' +
          ' applicable. This increases operation time by approximately one second total.',
        default: false,
        shortFlag: 'r',
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

if (cli.flags.classes) {
  const classes = await fetchStatusCodeClasses();

  console.log(cli.flags.yaml ? yamlStringify(classes) : classes);
} else {
  const resolveRedirects = cli.flags.resolveRedirects as boolean;
  const codes = await fetchStatusCodes({ resolveRedirects });

  if (cli.flags.yaml) {
    // We use `console.log` here because using `console.dir` prints the raw string output. That
    // includes quotes, concatenation operators, new line characters, etc.
    console.log(yamlStringify(codes));
  } else {
    // We use `console.dir` here because the status codes are nested too deep for `console.log`.
    console.dir(codes, { depth: null });
  }
}
