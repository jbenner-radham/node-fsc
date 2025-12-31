fsc
===

A CLI app to fetch the HTTP status codes from the [IANA](https://www.iana.org/) registry.

Features
--------

- Fetches HTTP status codes (or HTTP status code classes) from the IANA registry.
- No caching mechanisms are used, so the data is always up to date.
- Supports JSON or YAML output.
- Optionally, resolves URL redirects.

Install
-------

```sh-session
npm install fsc
```

Usage
-----

```sh-session
$ fsc --help

  Fetch the HTTP status codes from the IANA registry.

  Usage
    $ fsc [OPTIONS]

  Options
    --classes, -c            Fetch the HTTP status code classes instead of the
                             status codes.
    --help, -h               Display this message.
    --resolve-redirects, -r  Resolve URL redirects and add a section hash to the
                             URL as well if applicable. This increases total
                             operation time by approximately one second.
    --version, -v            Display the application version.
    --yaml, -y               Display the HTTP status codes (or classes) as YAML
                             instead of JSON.
```

License
-------

The BSD 3-Clause License. See the [license file](LICENSE) for details.
