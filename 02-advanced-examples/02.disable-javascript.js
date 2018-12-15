const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();

    // Set the logic for each request intercepted
    await page.setRequestInterception(true);
    page.on('request', request => {
      if(request.resourceType() === 'script') {
        request.abort();
        console.log(chalk.red('✕') + ' ' + chalk.yellow('Cancelling .js script: '), request.url());
      } else {
        request.continue();
      }
    });

    // Open page and take screenshot
    await page.goto('https://www.youtube.com');
    await page.screenshot({ path: './youtube-with-js-disabled.png', fullPage: true });
    console.log(chalk.green('✔') + ' Disabled JS and screenshot generated...');

    // Very important to close the browser's instance
    await browser.close();
  });
})();