const router = require('express').Router();

const posts = [
    {
        username: "Bob",
        title: "Post 1"
    },
    {
        usernae: "Billy",
        title: "Post 2"
    }
];

router.get('/posts', (req, res) => {
    res.json(posts);
});

module.exports = router;