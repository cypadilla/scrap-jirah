const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
    try {
        // Configuración necesaria para Puppeteer en entornos en la nube
        const browser = await puppeteer.launch({
            headless: true, // Ejecuta en modo headless
            args: ['--no-sandbox', '--disable-setuid-sandbox'], // Requerido en entornos como Render
        });

        const page = await browser.newPage();
        await page.goto('https://web.bascbogota.com/node/5', { waitUntil: 'networkidle2' });

        // Extrae el contenido de la página
        const content = await page.content();

        // Cierra el navegador
        await browser.close();

        // Devuelve el contenido HTML
        res.status(200).send(content);
    } catch (error) {
        console.error('Error durante el scraping:', error);
        res.status(500).send({ error: 'Error al realizar el scraping.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Puppeteer corriendo en http://localhost:${PORT}`);
});
