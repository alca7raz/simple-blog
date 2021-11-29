const express = require('express');
const router = express.Router();
const { showPosts } = require("../schema/post");
const { website } = require('../config.json');
const getPost = require('../middlewares/getPost');

// Index
router.get('/', (req, res) => {
    showPosts().then((ps) => {
        res.render('index', Object.assign(website, { posts: ps }));
    }) 
});

// Posts
router.get('/post/:id',getPost, async (req, res) => {
    res.render('post', Object.assign(website, req.article));
});

// About
router.get('/about', (req, res) => {
    res.render('about', website);
});

module.exports = router;
