const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();

    // Set the logic for each request intercepted
    await page.setRequestInterception(true);
    page.on('request', request => {
      if(request.url().match('.jpeg')) {
        request.abort();
        console.log(chalk.red('✕') + ' ' + chalk.yellow('Cancelling .jpeg image: '), request.url());
      } else {
        request.continue();
      }
    });

    // Open page and take screenshot
    await page.goto('https://www.meneame.net');
    await page.waitForSelector('div#variable > div#wrap > div#container > div#newswrap');
    await page.screenshot({ path: './http-imgs-intercepted.png', fullPage: true });
    console.log(chalk.green('✔') + ' Skipped images and screenshot generated...');

    // Very important to close the browser's instance
    await browser.close();
  });
})();