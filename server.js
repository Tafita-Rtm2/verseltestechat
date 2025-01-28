const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir le fichier HTML
app.use(express.static(path.join(__dirname)));

// Endpoint API pour communiquer avec l'API externe
app.get('/api/chat', async (req, res) => {
    const userMessage = req.query.message || '';
    const userId = req.query.userid || '1234';

    try {
        const apiResponse = await fetch(
            `https://yt-video-production.up.railway.app/gpt4-omni?ask=${encodeURIComponent(userMessage)}&userid=${encodeURIComponent(userId)}`
        );
        const data = await apiResponse.json();

        if (data && data.response) {
            res.json({ success: true, response: data.response });
        } else {
            res.json({ success: false, error: 'Invalid response from API' });
        }
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
