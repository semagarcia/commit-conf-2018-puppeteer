const puppeteer = require('puppeteer');

(async () => {
    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();

        // set the viewport so we know the dimensions of the screen
        await page.setViewport({ width: 800, height: 600 });

        // go to a page setup for mouse event tracking
        await page.goto('http://unixpapa.com/js/testmouse.html');

        // click
        await page.mouse.click(132, 103, { button: 'left' });
        
        // Very important to close the browser's instance
        //await browser.close();
    });
})();