const router = require('express').Router();

// Controllers
const loginControllers = require('../controllers/login.controller');

// Middlewares
const checkLoginCredentials = require('../middlewares/checkRegisterCredentials');

router.post('/', checkLoginCredentials, loginControllers.login);

module.exports = router;
