const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--no-zygote',
                '--single-process',
            ],
        });

        const page = await browser.newPage();
        await page.goto('https://web.bascbogota.com/node/5', { waitUntil: 'networkidle2' });

        const content = await page.content();
        res.send(content);

        await browser.close();
    } catch (error) {
        console.error('Error durante el scraping:', error);
        res.status(500).json({ error: 'Error al realizar el scraping.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Puppeteer corriendo en http://localhost:${PORT}`);
});
