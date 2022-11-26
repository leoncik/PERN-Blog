const router = require('express').Router();

// Controllers
const userControllers = require('../controllers/user.controller');

// Middlewares
const authorization = require('../middlewares/authorization');
// const multer = require('../middlewares/multerConfig')

router.get('/profile', authorization, userControllers.getProfile);
router.put('/profile/username', authorization, userControllers.editUsername);

// Multer version
// router.post('/profile/upload', authorization, multer, userControllers.sendAvatar);

// express-fileupload version
router.post('/profile/upload', authorization, userControllers.sendAvatar);

// Todo : refactor in order to get posts according to user.
// router.get('/posts', userControllers.getPosts)

module.exports = router;
