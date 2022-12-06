const pool = require('../config/db');

exports.checkUserDb = async (email) => {
    const { rows } = await pool.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
    return rows;
};

exports.createUserDb = async (username, email, bcryptPassword) => {
    const { rows } = await pool.query(
        `INSERT INTO users (username, email, password)
        VALUES($1, $2, $3)
        RETURNING *`,
        [username, email, bcryptPassword]
    );
    return rows;
};
