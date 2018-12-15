const ora = require('ora');
const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();
        const spinner = ora(chalk.yellow('Executing task...')).start();

        // set the viewport to ensure the desktop view (responsive breakpoint)
        await page.setViewport({ width: 1280, height: 800 });

        // go to a page setup for mouse event tracking
        await page.goto('https://www.gft.com');

        // Open menu (mouse hover)
        await page.hover('body > div.container > header > div > div.b-navigation > ol.navigation__anchorlist > li:nth-child(6)');

        // Click on "job offers"
        await page.click('#panel-6 > section > div > ul > li:nth-child(4) > div > ul > li:nth-child(2) > a');
        await page.waitFor(300);

        // scrollIntoView is not fully supported, but as we're using a chrome, we can use it
        await page.evaluate(() => document.querySelector('#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > form > fieldset > div > div:nth-child(1) > div:nth-child(3) > div > span').scrollIntoView());
        await page.click('#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > form > fieldset > div > div:nth-child(1) > div:nth-child(3) > div > span');

        await page.waitForSelector('#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > form > fieldset > div > div:nth-child(1) > div:nth-child(3) > div > div > ul > li:nth-child(3) > span');
        await page.click('#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > form > fieldset > div > div:nth-child(1) > div:nth-child(3) > div > div > ul > li:nth-child(3) > span');

        await page.waitForSelector('#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > div > div.results__header-inner > h3 > strong');

        await page.waitFor(200);
        let offers = await page.evaluate(async (sel) => {
            return document.querySelector(sel).innerText;
        }, '#main > section.zone.is-bg-lighter-grey.is-container-padding > div > div > div > div > div > div.results__header-inner > h3 > strong');
        spinner.succeed('The number of job offers is: ' + (offers ? chalk.green(offers) : chalk.red(0)));

        // Very important to close the browser's instance
        //await browser.close();
    });
})();