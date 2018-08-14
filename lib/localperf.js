const Commands = require('./commands');
const ngrok = require('ngrok');
const psi = require('psi');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const ReportCategories = require('./reportCategories');
const cTable = require('console.table');

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
    this.format = this.commands.json ? 'json' : 'cli';
    this.strategy = this.commands.strategy;
    this.keepalive = this.commands.keepalive;
    this.indexonly = this.commands.indexonly;
    this.lighthouseOpts = {
      chromeFlags: ['--show-paint-rects']
    };
  }

  async getPsiTestResult(url) {
    if (this.format === 'cli') {
      await psi.output(url, { strategy: this.strategy, threshold: 0 });
    } else {
      return psi(url, { strategy: this.strategy });
    }
    return true;
  }

  async launchChromeAndRunLighthouse(url, opts, config = null) {
    return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        // The comments below are from the docs https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically
        // But! they do not work. At all.
        
        // use results.lhr for the JS-consumeable output
        // https://github.com/GoogleChrome/lighthouse/blob/master/typings/lhr.d.ts
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => results)
      });
    });
  }

  // Receives reportCategories from lighthouse results
  outputLighthouseVisualization(reportCategories) {
    const c = [];
    reportCategories.forEach(rc => {
      c.push(new ReportCategories(rc.name, rc.score))
    });

    console.log(cTable.getTable('Lighthouse Results', c));
  }

  runVirtualEnv() {
    console.log('Connecting to ngrok...');
    ngrok.connect({
      proto: 'http', // http|tcp|tls
      addr: this.port, // port or network address
      region: 'eu', // one of ngrok regions (us, eu, au, ap), defaults to us,
    }, (err, url) => {
      if (err) {
        throw new Error('Could not get a server from ngrok!');
      }
      console.log(`You ngrok URL is: ${url}`);
      console.log('Requesting Page Insights results...');
      this.getPsiTestResult(url).then((data) => {
        if (this.format !== 'cli') {
          console.log(data);
        }
        console.log('Requesting Lighthouse results...');
        this.launchChromeAndRunLighthouse(url, this.lighthouseOpts.chromeFlags).then(results => {
          this.outputLighthouseVisualization(results.reportCategories);
          if (!this.keepalive) {
            process.exit(0);
          }
        });
      });
    });
  }
}

module.exports = LocalPerf;
