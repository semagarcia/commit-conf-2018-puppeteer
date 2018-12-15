const fs = require('fs');
const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();

    // Open page and prints the HTML content
    const url = 'https://www.koliseo.com/events/commit-2018/r4p/5630471824211968/agenda#/5116072650866688';
    await page.goto(url, { waitUntil: 'networkidle0' });
    const htmlContent = await page.content();
    console.log(chalk.green('Page content extracted!'));
    fs.writeFileSync('./agenda-web-page.html', htmlContent);
    console.log(chalk.green('✔') + ' HTML Web Content saved successfully!');

    // Very important to close the browser's instance
    await browser.close();
  });
})();