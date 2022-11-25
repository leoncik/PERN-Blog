const pool = require('../config/db');

exports.getProfile = async (req, res) => {
    try {
        // Todo : for a future version, this query could also return more stats.
        // Todo : for now, we just return the username to display It in the main navigation.
        const profile = await pool.query(
            'SELECT username FROM users WHERE id = $1',
            [req.user]
        );

        res.json(profile.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error.');
    }
};

exports.editUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const profile = await pool.query(
            `UPDATE users SET username = $1
             WHERE id = $2`,
            [username, req.user]
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error.');
    }
};

exports.sendAvatar = async (req, res) => {
    try {
        console.log(req.file);       
    } catch (error) {
        console.log(error);
        
    }
};