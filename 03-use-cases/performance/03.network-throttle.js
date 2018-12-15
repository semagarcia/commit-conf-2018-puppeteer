let NETWORK_PRESETS = {
    'GPRS': {
      'offline': false,
      'downloadThroughput': 50 * 1024 / 8,
      'uploadThroughput': 20 * 1024 / 8,
      'latency': 500
    },
    'Regular2G': {
      'offline': false,
      'downloadThroughput': 250 * 1024 / 8,
      'uploadThroughput': 50 * 1024 / 8,
      'latency': 300
    },
    'Good2G': {
      'offline': false,
      'downloadThroughput': 450 * 1024 / 8,
      'uploadThroughput': 150 * 1024 / 8,
      'latency': 150
    },
    'Regular3G': {
      'offline': false,
      'downloadThroughput': 750 * 1024 / 8,
      'uploadThroughput': 250 * 1024 / 8,
      'latency': 100
    },
    'Good3G': {
      'offline': false,
      'downloadThroughput': 1.5 * 1024 * 1024 / 8,
      'uploadThroughput': 750 * 1024 / 8,
      'latency': 40
    },
    'Regular4G': {
      'offline': false,
      'downloadThroughput': 4 * 1024 * 1024 / 8,
      'uploadThroughput': 3 * 1024 * 1024 / 8,
      'latency': 20
    },
    'DSL': {
      'offline': false,
      'downloadThroughput': 2 * 1024 * 1024 / 8,
      'uploadThroughput': 1 * 1024 * 1024 / 8,
      'latency': 5
    },
    'WiFi': {
      'offline': false,
      'downloadThroughput': 30 * 1024 * 1024 / 8,
      'uploadThroughput': 15 * 1024 * 1024 / 8,
      'latency': 2
    }
}

const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async => {
    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();

        // Connect to Chrome DevTools
        const client = await page.target().createCDPSession()

        // Set throttling property
        await client.send('Network.emulateNetworkConditions', {
            'offline': true,
            'downloadThroughput': 200 * 1024 / 8,
            'uploadThroughput': 200 * 1024 / 8,
            'latency': 20
        });

        // Navigate and take a screenshot
        await page.goto('https://www.meneame.net');
        await page.screenshot({ path: 'offline.png' });
        // await browser.close();
    });
})();