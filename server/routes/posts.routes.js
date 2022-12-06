const router = require('express').Router();

// Controllers
const postsControllers = require('../controllers/posts.controller');

// Middlewares
const authorization = require('../middlewares/authorization');

router.post('/', authorization, postsControllers.createPost);
router.get('/', authorization, postsControllers.getAllPosts);
router.put('/:id', authorization, postsControllers.editPost);
router.delete('/:id', authorization, postsControllers.deletePost);

module.exports = router;
