const router = require('express').Router();

// Controllers
const jwtAuthControllers = require('../controllers/jwtAuth.controller');

// Middlewares
const checkRegisterCredentials = require('../middlewares/checkRegisterCredentials');

router.post('/', checkRegisterCredentials, jwtAuthControllers.register);

module.exports = router;
