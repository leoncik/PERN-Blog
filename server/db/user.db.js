const pool = require('../config/db');

exports.getProfileDb = async (req) => {
    const { rows } = await pool.query(
        `SELECT username, avatar, registered_date
             FROM users WHERE id = $1`,
        [req.user.id]
    );
    return rows;
};

exports.editUsernameDb = async (req) => {
    const { username } = req.body;
    await pool.query(
        `UPDATE users SET username = $1
             WHERE id = $2`,
        [username, req.user.id]
    );
    return true;
};

exports.getPreviousAvatarDb = async (req) => {
    const previousAvatar = await pool.query(
        `SELECT avatar FROM users
         WHERE id = $1`,
        [req.user.id]
    );
    return previousAvatar;
};

exports.updateAvatarDb = async (cleanedFileName, req) => {
    await pool.query(
        `UPDATE users SET avatar = $1
         WHERE id = $2`,
        [cleanedFileName, req.user.id]
    );
    return true;
};

exports.deleteAccountDb = async (req) => {
    // Delete all blog posts from connected user
    await pool.query(
        `DELETE FROM blog_posts
             WHERE user_id = $1`,
        [req.user.id]
    );
    // Delete connected user
    await pool.query(
        `DELETE FROM users
             WHERE id = $1`,
        [req.user.id]
    );
    return true;
};
