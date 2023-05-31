const router = require('express').Router();
const { Post, User, Comment } = require('/Users/final/Documents/tech-blog-cms/models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['username'] }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/profile', withAuth, (req, res) => {
    try {
      res.render('profile', {
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;