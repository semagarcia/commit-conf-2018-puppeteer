const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async () => {
  puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage();
  
    // Set a referer to simulate a navigation from a Google's search
    await page.setExtraHTTPHeaders({ Referer: 'https://www.google.es' });
    await page.goto('https://www.meneame.net');

    // Wait for an element to be sure of its load
    await page.waitForSelector('div#variable > div#wrap > div#container > div#newswrap');
    const news = await page.evaluate(() => {
      const path = 'div#newswrap > div.news-summary > div.news-body div.center-content > h2 > a';
      const links = Array.from(document.querySelectorAll(path));
      return links.map(titleLink => { 
        return { 
          title: titleLink.text.trim(),
          link: titleLink.href
        }
      });
    });

    console.log('News extracted: ' + chalk.yellow(news.length));
    console.log(chalk.yellow('--------------------------------------'));
    news.forEach(n => console.log(`\n${chalk.green(n.title)}\n${chalk.blue(n.link)}`));

    // Very important to close the browser's instance
    await browser.close();
  });
})();