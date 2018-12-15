// Device descriptors: https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhoneX = devices['iPhone X'];

(async => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();
  
    // When we use page.emulate it is not needed anymore the viewport
    await page.emulate(iPhoneX);
  
    // Open web and take screenshot (not full page)
    await page.goto('https://2018.commit-conf.com/');
    await page.screenshot({ path: 'commit-conf-iphoneX.png' });
  
    // Very important to close the browser's instance
    await browser.close();
  });
})();