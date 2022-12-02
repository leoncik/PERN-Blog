module.exports = (req, res, next) => {
    const { email, password } = req.body;

    const validEmail = (userEmail) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);

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
