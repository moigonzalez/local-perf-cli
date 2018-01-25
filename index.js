const ngrok = require('ngrok'),
      psi = require('psi');

ngrok.connect({
    proto: 'http', // http|tcp|tls
    addr: 3003, // port or network address
    region: 'eu' // one of ngrok regions (us, eu, au, ap), defaults to us,
}, function (err, url) {
    if (err) {
        throw new Error(`Could not get a server from ngrok!`);
        process.exit(1);
    }
    psi(url, {strategy: 'desktop'}).then(data => {
        console.log(data);
        // process.exit(0);
    });
});
