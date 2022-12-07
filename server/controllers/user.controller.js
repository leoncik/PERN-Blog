const userService = require('../services/user.service');

exports.getProfile = async (req, res) => {
    const profile = await userService.getProfile(req);
    res.status(202).json(profile[0]);
};

exports.editUsername = async (req) => {
    userService.editProfile(req);
};

exports.sendAvatar = async (req, res) => {
    const response = await userService.sendAvatar(req);
    res.status(202).json(response);
};

exports.deleteUser = async (req, res) => {
    userService.deleteAccount(req);
    res.json('User and his blog posts has been deleted successfully.');
};
