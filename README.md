# 🖥 MODULE D'AUTHENTIFICATION AVEC JWT

## 🎯 But du projet
Créer un module d'authentification utilisant les JSON web tokens. Gérer ce que les utilisateurs peuvent faire selon leur identification. Comprendre le fonctionement des JWT.

## ⌨️ Les dépendances
`express` `dotenv` `jsonwebtoken` `bcrypt`

## 📑 Les étapes
Commencer par initialiser le serveur avec `npm init` et installer les dépendances.

Créer un fichier `index.js` et écrire le code nécessaire pour que le serveur écoute sur le port que l'on souhaite.

Créer ensuite un fichier `router.js` pour séparer nos routes du reste du code, pour mieux s'organiser.

Ce fichier doit contenir 3 routes :
| Méthode | Route | Utilité |
|-------|---------|---------|
| GET | /users | ne sera accessible qu'à une personne qui dispose d'un token (`JWT`) |
| POST | /users | enregistre un utilisateur |
| POST | /users/login | permet de se connecter et de posséder un JWT |

Pour finir, créer un middleware pour la route GET `/users` qui vérifie si le token de l'utilisateur est valide.

## 📍 Conclusion
Savoir ce qu'est un `JWT` et savoir l'utiliser sur un module d'authentification très simple. Pouvoir gérer si un utilisateur possède le droit de se rendre sur une route spécifique ou pas.