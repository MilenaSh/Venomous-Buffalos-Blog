const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Require the post schema
const Post = require('../models/post');

// CreatePost 
router.post('/posts/newpost', (req, res, next) => {
    let newPost = new Post({
        ownerUsername: req.body.ownerUsername,
        name: req.body.name,
        img: req.body.img,
        text: req.body.text,
        dateCreated: req.body.dateCreated,
        dateEdited: req.body.dateEdited
    });

    Post.addPost(newPost, (err, post) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add post' });
        } else {
            res.json({ success: true, msg: 'Post added' });
        }
    });
});

module.exports = router;