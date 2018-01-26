const program = require('commander');

class Commands {
  constructor() {
    program
      .version('0.0.1')
      .arguments('<port> [options]')
      .option('-k, --keepalive', 'Keep the ngrok connection alive after the performance test')
      .option('-s, --strategy [strategy]',
              'The strategy to use. Can be desktop or mobile',
              /^(desktop|mobile)$/i,
              'desktop'
              )
      .option('-v, --verbose', 'Verbose output')
      .option('-p, --pretty', 'Pretty print the output')
      .action((port) => {
        program.port = port;
      })
      .parse(process.argv);
    this.program = program;
  }
}

module.exports = Commands;
