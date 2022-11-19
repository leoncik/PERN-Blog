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
