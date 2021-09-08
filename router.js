// Récupère les variables d'environement du fichier .env
require('dotenv').config();

// Crée un nouveau router
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Récupère le middleware du fichier middleware.js
const authenticateToken = require('./middleware');

// Les utilisateurs enregistrés seront stockés dans cette variable
const users = [];

// Route disponible seulement si l'utilisateur est connecté grâce à un JWT
router.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

// Route qui enregistre un utilisateur dans la variable `users`
router.post('/users', async (req, res) => {
    try {
        // Hash le mot de passe envoyé à travers le corps de la requête
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Création d'une variable user qui content le nom et le mot de passe de l'utilisateur
        const user = {
            name: req.body.name,
            password: hashedPassword
        };

        // Ajout de l'utilisateur dans le tableau d'utilisateur
        users.push(user);
        res.status(201).send("ok");
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});

// Route qui permet de se connecter et de posséder un JWT
router.post('/users/login', async (req, res) => {
    // Cherche si le nom entré dans le formulaire est déjà dans le tableau `users`
    const user = users.find(user => user.name === req.body.name);
    // Si ce n'est pas le cas, l'utilisateur ne s'est pas inscrit
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    try {
        // Si l'utilisateur est bien inscrit
        // Compare le mot de passe rentré dans le formulaire avec le mot de passe qui lui est associé
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Si les mots de passes correspondent, l'utilisateur reçoit un JWT
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            user.token = accessToken;
            res.send(accessToken);
            // L'utilisateur peut accéder a la route /users grâce a son token
        } else {
            res.send('Wrong password');
        }
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});

module.exports = router;