const router = require('express').Router();

// Controllers
const userControllers = require('../controllers/user.controller');

// Middlewares
const authorization = require('../middlewares/authorization');

// Routes
router.get('/profile', authorization, userControllers.getProfile);
router.put('/profile/username', authorization, userControllers.editUsername);
router.post('/profile/upload', authorization, userControllers.sendAvatar);
router.delete('/', authorization, userControllers.deleteUser);

module.exports = router;
