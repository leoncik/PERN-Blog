module.exports = function (req, res, next) {
    const { email, username, password } = req.body;

    const validEmail = (userEmail) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

    // Check if ant field is empty
    if (![email, username, password].every(Boolean)) {
        return res.status(401).json('Missing Credentials');
    } else if (!validEmail(email)) {
        return res.status(401).json('Invalid Email');
    }

    next();
};