const express = require('express');
const router = express.Router();
const { website } = require('../config.json');
const authenticator = require("../middlewares/authenticator");
const getPost = require("../middlewares/getPost");
const updatePost = require("../middlewares/updatePost");
const { sign, verify } = require("../modules/authenticator");
const { showPosts, deletePost } = require("../schema/post");
const verifyLogin = require("../schema/user");

// Login Page
router.get('/login', (req, res) => {
    if (verify(req.cookies.token))
        res.redirect("/admin");
    else
        res.render('admin/login', Object.assign(website));
});

// Login Handler
router.post('/login', (req, res) => {
    const login = {
        username: req.body.name,
        password: req.body.password
    };
    verifyLogin(login).then((l) => {
        if (l) {
            res.cookie("token", sign({ username: login.username }), { maxAge: 900000, httpOnly: true });
            res.redirect("/admin");
        } else {
            res.redirect("/error/401");
        }
    });
});

// Main Menu
router.get('/', authenticator, async (req, res) => {
    showPosts().then((ps) => {
        res.render('admin/posts', Object.assign(website, { posts: ps }));
    });
});

// Post Editor
router.get('/post/:id', authenticator, getPost, async (req, res) => {
    res.render('admin/editor', Object.assign(website, req.article, { id: req.params.id, isNew: false }));
});

// Post Update&Create
router.post('/post', authenticator, updatePost, async (req, res) => {
    res.redirect('/admin');
});

// Post Creator
router.get('/post', authenticator, async (req, res) => {
    res.render('admin/editor', Object.assign(website, { title: "Create New Article", id: 0, isNew: true }));
});

// Post Delete
router.get('/delete/:id', authenticator, getPost , async (req, res) => {
    deletePost(req.params.id).then(() => res.redirect('/admin'));
});

module.exports = router;
