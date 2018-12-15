const chalk = require('chalk');
const puppeteer = require('puppeteer');

const puppeteerConfig = {
  headless: false
};

(async => {
  puppeteer.launch(puppeteerConfig).then(async browser => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  
    await page.goto('https://www.koliseo.com/events/commit-2018/r4p/5630471824211968/agenda#/5116072650866688');
    await page.screenshot({
      path: './agenda-screenshot.png',
      fullPage: true
      /*clip: {
        x: 0,
        y: 0,
        width: 1280,
        height: 150
      }*/
    });
  
    console.log('Screenshot result: ' + chalk.green('✔'));
    await browser.close();
  });
})();