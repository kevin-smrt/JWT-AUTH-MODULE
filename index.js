// Récupère les variables du fichier .env
require('dotenv').config();

const express = require('express');
// Récupère le router exporté dans le fichier router.js
const router = require('./router');

const app = express();
// Récupère la variable PORT du fichier .env
const PORT = process.env.PORT;

// Permet au serveur de communiquer au format JSON
app.use(express.json());

// Utilisation du router
app.use(router);

// Ecoute du serveur
app.listen(PORT, () => {
    console.log(`Server ready on http://localhost/${PORT}`);
});