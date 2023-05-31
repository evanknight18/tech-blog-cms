const express = require('express');
const router = express.Router();
const { Comment, User } = require('/Users/final/Documents/tech-blog-cms/models');
const withAuth = require('/Users/final/Documents/tech-blog-cms/utils/auth');

// get all comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
