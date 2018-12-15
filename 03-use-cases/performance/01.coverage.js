const chalk = require('chalk');
const puppeteer = require('puppeteer');

(async => {
    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();
    
        // Start coverage
        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage()
        ]);
    
        // go to the desired page
        await page.goto('https://www.madrid.es/');
    
        // Stop coverage
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);
    
        const jsCov = computeCoverage([...jsCoverage]);
        const cssCov = computeCoverage([...cssCoverage]);
        
        console.log(chalk.yellow('-----------------------------------------'));
        console.log(chalk.yellow('----------------- RESULTS ---------------'));
        console.log(chalk.yellow('-----------------------------------------'));
        console.log(`JS Code used by only ${(jsCov < 50) ? chalk.red(jsCov) : chalk.green(jsCov)}%`);
        console.log(`CSS Code used by only ${(cssCov < 50) ? chalk.red(cssCov) : chalk.green(cssCov)}%`);
        console.log(chalk.yellow('-----------------------------------------'));
        
        // Very important to close the browser's instance
        await browser.close();
    });
    
    const computeCoverage = (coverage) => {
        let totalBytes = 0;
        let usedBytes = 0;
        for (const entry of coverage) {
            totalBytes += entry.text.length;
            for (const range of entry.ranges)
                usedBytes += range.end - range.start - 1;
        }
        return ((usedBytes / totalBytes) * 100).toFixed(2);
    };
})();