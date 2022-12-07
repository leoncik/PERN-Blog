const jwtAuthService = require('../services/jwtAuth.service');

exports.register = async (req, res) => {
    const response = await jwtAuthService.register(req);
    res.json(response);
};

exports.authorize = async (req, res) => {
    const isAuthorized = await jwtAuthService.authorize(req);
    res.json(isAuthorized);
};
