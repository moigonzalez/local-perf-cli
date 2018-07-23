local-perf-cli
=====

[![forthebadge](https://forthebadge.com/images/badges/built-with-swag.svg)](https://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)

Local performance reporting from the command line 💻

### Installation

```
npm install -g local-perf-cli
```

### How it works

```
> local-perf <port> [options]

Options:

  -V, --version              output the version number
  -k, --keepalive            Keep the ngrok connection alive after the performance test
  -s, --strategy [strategy]  The strategy to use. Can be desktop or mobile (default: desktop)
  -v, --verbose              Verbose output
  -p, --pretty               Pretty print the output
  -i --indexonly             Give only the speed index
  -h, --help                 output usage information

```

### TODO

* Save the results for making comparisons between experiments

### Contributing

Please see our [contributing.md](https://github.com/moigonzalez/local-perf-cli/blob/master/contributing.md)

### License

[MIT](https://mit-license.org/)
