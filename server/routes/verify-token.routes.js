const router = require('express').Router();

// Controllers
const jwtAuthControllers = require('../controllers/jwtAuth.controller');
const authorization = require('../middlewares/authorization');

router.get('/', authorization, jwtAuthControllers.authorize);

module.exports = router;