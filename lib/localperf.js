const Commands = require('./commands'),
      ngrok = require('ngrok'),
      psi = require('psi');

class LocalPerf {
  constructor() {
    this.commands = new Commands().program;
  }

  init() {
    this.parseArgs();
    this.runVirtualEnv();
  }

  parseArgs() {
    this.port = this.commands.port;
    this.format = this.commands.pretty ? 'cli' : 'json';
    this.strategy = this.commands.strategy;
    this.keepalive = this.commands.keepalive;
    this.indexonly = this.commands.indexonly;
  }

async getTestResult(url) {
  if (this.format === 'cli') {
    await psi.output(url, {strategy: this.strategy});
  }
  else {
    return psi(url, {strategy: this.strategy});
    if (this.indexonly) {
      process.exit(data.ruleGroups.SPEED.score);
    }
  }
}

  runVirtualEnv() {
      ngrok.connect({
          proto: 'http', // http|tcp|tls
          addr: this.port, // port or network address
          region: 'eu' // one of ngrok regions (us, eu, au, ap), defaults to us,
      }, (err, url) => {
        if (err) {
          throw new Error(`Could not get a server from ngrok!`);
          process.exit(1);
        }

        this.getTestResult(url).then(data => {
          console.log(data);
          if (!this.keepalive) {
            process.exit(0)
          };
          console.log(`You ngrok URL is: ${url}`);
        });
    });
  }
}

module.exports = LocalPerf;
