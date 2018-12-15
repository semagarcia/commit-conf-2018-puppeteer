const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
    // For printing a PDF we have to set a headless puppeteer instance
    puppeteer.launch({ headless: true }).then(async browser => {
        const page = await browser.newPage();

        // set the viewport so we know the dimensions of the screen
        await page.setViewport({ width: 1280, height: 800 });

        // go to a page setup for mouse event tracking
        await page.goto('https://2018.commit-conf.com/');

        // generate pdf
        await page.pdf({ path: './commit-conf.pdf', format: 'A4', printBackground: true });
        console.log(chalk.green('✔') + ' PDF generated!');
        
        // Very important to close the browser's instance
        await browser.close();
    });
})();