const router = require('express').Router();

const loginControllers = require('../controllers/login.controller');

router.post('/', loginControllers.login);

module.exports = router;
