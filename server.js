const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
    const browser = await puppeteer.launch({ headless: true }); // Puede ser 'false' para ver el navegador.
    const page = await browser.newPage();
    await page.goto('https://web.bascbogota.com/node/5', { waitUntil: 'networkidle2' });

    // Extrae el contenido o haz lo que necesites con Puppeteer.
    const content = await page.content();  // Puedes cambiar esto según lo que necesites extraer.

    // Devuelve el contenido HTML
    res.send(content);

    await browser.close();
});

app.listen(PORT, () => {
    console.log(`Servidor Puppeteer corriendo en http://localhost:${PORT}`);
});
