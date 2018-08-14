const program = require('commander');

class Commands {
  constructor() {
    program
      .version('1.0.6')
      .arguments('<port> [options]')
      .description('Local performance reporting from the command line 💻')
      .option('-k, --keepalive', 'Keep the ngrok connection alive after the performance test')
      .option(
        '-s, --strategy [strategy]',
        'The strategy to use. Can be desktop or mobile',
        /^(desktop|mobile)$/i,
        'desktop',
      )
      .option('-v, --verbose', 'Verbose output')
      .option('-p, --json', 'Outputs json instead of pretty')
      .option('-i --indexonly', 'Give only the speed index')
      .option('--skip-lighthouse', 'Skips lighthouse test')
      .action((port) => {
        program.port = port;
      })
      .parse(process.argv);
    this.program = program;
  }
}

module.exports = Commands;
