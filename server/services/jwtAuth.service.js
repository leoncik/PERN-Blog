const { checkUserDb, createUserDb } = require('../db/jwtAuth.db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

class JwtAuthService {
    register = async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await checkUserDb(email);

            if (user.length !== 0) {
                return res
                    .status(401)
                    .send('User already exists with that email.');
            }

            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);

            const newUser = await createUserDb(username, email, bcryptPassword);

            const token = jwtGenerator(newUser[0].id);
            const response = { token, status: 200 };

            return response;
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error.');
        }
    };

    authorize = async (req, res) => {
        if (req.user.id) {
            return true;
        } else {
            res.status(500).send('Server error.');
            return false;
        }
    };
}

module.exports = new JwtAuthService();
