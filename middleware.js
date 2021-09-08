// Récupère le module JWT
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // Récupère le header 'authorization'
    const authHeader = req.headers['authorization'];
    // Si le header est présent, coupe le tableau a chaque espace, et retourne l'index 1 du tableau qui correspond au token
    const token = authHeader && authHeader.split(' ')[1];

    // Si il n'y a pas de token
    if (!token) {
        // Retourne un code d'erreur et le code s'arrête la
        return res.sendStatus(401);
    }

    // Vérifie si le token récupéré est le bon grace à la variable avec laquelle le token est hash
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });

}

module.exports = authenticateToken;