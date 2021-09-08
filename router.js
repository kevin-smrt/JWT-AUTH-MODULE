require('dotenv').config();

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

router.get('/users', (req, res) => {
    res.json(users);
});

router.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            password: hashedPassword
        };

        users.push(user);
        res.status(201).send("ok");
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});

router.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name);
    if (!user) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            user.token = accessToken;
            res.send('Success');
        } else {
            res.send('Wrong password');
        }
    } catch (error) {
        res.status(500).send();
        console.error(error);
    }
});

module.exports = router;