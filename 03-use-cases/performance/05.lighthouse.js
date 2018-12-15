const fs = require('fs');
const chalk = require('chalk');
const { URL } = require('url');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');

const opts = {
    chromeFlags: [
        '--headless', 
        '--no-sandbox', 
        '--disable-gpu', 
        '--disable-setuid-sandbox', 
        '--disable-dev-shm-usage'
    ]
};

(async () => {
    const browser = await puppeteer.launch({ args: opts.chromeFlags });
  
    process.on('unhandledRejection', async (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason: ', reason);
        await browser.close();
    });
  
    // JSON
    var { report } = await lighthouse('https://www.madrid.es/', {
        port: (new URL(browser.wsEndpoint())).port,  // Eq: browser().wsEndpoint().split(':')[2].split('/')[0]
        output: 'json',
        logLevel: 'info'
    });
    fs.writeFileSync('./report.json', report);

    // HTML
    var { report } = await lighthouse('https://www.madrid.es/', {
        port: (new URL(browser.wsEndpoint())).port,  // Eq: browser().wsEndpoint().split(':')[2].split('/')[0]
        output: 'html',
        logLevel: 'info'
    });
    fs.writeFileSync('./report.html', report);

    // Close browser's instance
    await browser.close();
})();










/*
// Launch chrome using chrome-launcher.
const chrome = await chromeLauncher.launch(opts);
opts.port = chrome.port;

// Connect to it using puppeteer.connect().
const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
const {webSocketDebuggerUrl} = JSON.parse(resp.body);
const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});

// Run Lighthouse.
const lhr = await lighthouse(URL, opts, null);
console.log(`Lighthouse score: ${lhr.score}`);
*/