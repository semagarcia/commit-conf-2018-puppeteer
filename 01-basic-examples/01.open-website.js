const puppeteer = require('puppeteer');

const puppeteerConfig = {
  headless: false
};

(async => {
  puppeteer.launch(puppeteerConfig).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  
    // Open and navigate to the desired address
    await page.goto('https://2018.commit-conf.com/');
  
    // Very important to close the browser's instance
    //await browser.close();
  });
})();