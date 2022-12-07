const loginService = require('../services/login.service');

exports.login = async (req, res) => {
    const response = await loginService.login(req);
    res.json(response);
};
