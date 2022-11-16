const router = require('express').Router();

// Controllers
const userControllers = require('../controllers/user.controller');

// Middlewares
const authorization = require('../middlewares/authorization');

router.get('/profile', authorization, userControllers.getProfile)
// Todo : refactor in order to get posts according to user.
// router.get('/posts', userControllers.getPosts)

module.exports = router;