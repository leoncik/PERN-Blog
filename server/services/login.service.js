const { getUserDb } = require('../db/login.db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

class LoginService {
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await getUserDb(email);

            if (user.length === 0) {
                // Note : we are only checking the email but
                // for security reason we do not say if the email exists in the database or not.
                return res.status(401).send('Invalid email or password.');
            }

            const validPassword = await bcrypt.compare(
                password,
                user[0].password
            );

            if (!validPassword) {
                return res.status(401).send('Invalid email or password.');
            }

            const token = jwtGenerator(user[0].id);

            const response = { token, status: 200 };

            return response;
        } catch (error) {
            res.status(500).send('Server error.');
        }
    };
}

module.exports = new LoginService();
