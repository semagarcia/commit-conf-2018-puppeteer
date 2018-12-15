// Device descriptors: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const iPhoneX = devices['iPhone X'];

(async () => {
    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();
      
        // When we use page.emulate it is not needed anymore the viewport
        await page.emulate(iPhoneX);
      
        // Start tracing
        console.log(chalk.yellow('Started tracing...'));
        await page.tracing.start({ path: 'trace-marca.json', screenshots: true });
        await page.goto('http://marca.com', { 
            timeout: 3000000,
            waitUntil: 'domcontentloaded'
        });
        
        // Stop tracing
        await page.tracing.stop();
        console.log(chalk.green('Stopped tracing'));
        console.log('File generated to be imported from Chrome: ' + chalk.green('trace-marca.json'));
      
        // Very important to close the browser's instance
        await browser.close();
    });
})();