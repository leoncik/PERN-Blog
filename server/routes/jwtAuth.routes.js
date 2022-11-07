const router = require('express').Router();

const jwtAuthControllers = require('../controllers/jwtAuth.controller');

router.post('/', jwtAuthControllers.register);

module.exports = router;
