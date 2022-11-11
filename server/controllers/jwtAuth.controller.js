const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [
            email,
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists with that email.');
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *',
            [username, email, bcryptPassword]
        );

        const token = jwtGenerator(newUser.rows[0].id);

        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
};

exports.authorize = async (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error.');
    }
};
