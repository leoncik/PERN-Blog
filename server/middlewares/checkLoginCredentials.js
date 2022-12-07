const { mailRegex } = require('../utils/helpers');

module.exports = (req, res, next) => {
    const { email, password } = req.body;

    const validEmail = (userEmail) => mailRegex.test(userEmail);

    // Check if ant field is empty
    if (![email, password].every(Boolean)) {
        return res
            .status(401)
            .json({ status: 401, message: 'Missing Credentials' });
    } else if (!validEmail(email)) {
        return res.status(401).json({ status: 401, message: 'Invalid Email' });
    }

    next();
};
