const pool = require('../config/db');

exports.getUserDb = async (email) => {
    const { rows } = await pool.query(
        `SELECT * FROM users
        WHERE email = $1`,
        [email]
    );
    return rows;
};
