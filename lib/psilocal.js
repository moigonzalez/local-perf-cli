const Commands = require('./commands'),
      ngrok = require('ngrok'),
      psi = require('psi'),
      shell = require('shelljs');

class PsiLocal {
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
        if (this.format === 'cli') {
          shell.exec(`psi ${url} --strategy ${this.strategy}`);
        }
        else {
          psi(url, {strategy: this.strategy, format: this.format})
          .then(data => {
              console.log(data);
          }, (err) => {
            throw new Error(`Error getting page insights for ${url}...`);
            process.exit(1);
          });
        }

        if (!this.keepalive) {
          process.exit(0)
        };

        console.log(`You ngrok URL is: ${url}`);
    });
  }
}

module.exports = PsiLocal;
