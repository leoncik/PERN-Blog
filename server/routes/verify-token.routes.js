const router = require('express').Router();

// Controllers
const jwtAuthControllers = require('../controllers/jwtAuth.controller');

// Middlewares
const authorization = require('../middlewares/authorization');

router.get('/', authorization, jwtAuthControllers.authorize);

module.exports = router;
