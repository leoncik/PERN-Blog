const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            `SELECT * FROM users
             WHERE email = $1`, [
            email,
        ]);

        if (user.rows.length === 0) {
            // Note : we are only checking the email but
            // for security reason we do not say if the email exists in the database or not.
            return res.status(401).send('Invalid email or password.');
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).send('Invalid email or password.');
        }

        const token = jwtGenerator(user.rows[0].id);

        res.json({ token, status: 200 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
};
