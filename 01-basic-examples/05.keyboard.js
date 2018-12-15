const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhoneX = devices['iPhone X'];

(async () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();
  
    // When we use page.emulate it is not needed anymore the viewport
    await page.emulate(iPhoneX);
  
    // Open web and search
    await page.goto('https://www.google.es');
    const inputDOMPath = '#tsf > div > div > div > div > div > input.gLFyf';
    //const inputDOMPath = '#tsf > div:nth-child(3) > div.A7Yvie.emca > div.zGVn2e > div.SDkEP > div.a4bIc > input.gLFyf';
    await page.focus(inputDOMPath);
    await page.keyboard.type('gft madrid');
    await page.screenshot({ path: 'gft-search.png' });
  
    // Very important to close the browser's instance
    await browser.close();
  });
})();