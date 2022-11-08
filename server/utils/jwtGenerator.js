const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtGenerator = (userId) => {
    const payload = {
        user: userId
    }

    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

module.exports = jwtGenerator;