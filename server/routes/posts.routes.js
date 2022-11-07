const router = require('express').Router();

// Controllers
const postsControllers = require('../controllers/posts.controller');

router.post('/', postsControllers.createPost);
router.get('/', postsControllers.getAllPosts);
router.get('/:id', postsControllers.selectPost);
router.put('/:id', postsControllers.editPost);
router.delete('/:id', postsControllers.deletePost);

module.exports = router;
