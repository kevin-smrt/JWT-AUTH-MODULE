const express = require('express');
const app = express();
const router = express.Router();

const posts = [
    {
        username: "Bob",
        title: "Post 1"
    },
    {
        usernae: "Billy",
        title: "Post 2"
    }
]

router.get('/posts', (req, res) => {
    res.json(posts);
});

app.use(router);

app.listen(3000);