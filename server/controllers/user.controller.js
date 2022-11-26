const pool = require('../config/db');
const imgPath = require('../app');

exports.getProfile = async (req, res) => {
    try {
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

exports.sendAvatar = (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const imgExtension = file.name.split('.').pop();
    const path = imgPath + 'avatar.' + 'jpg';

    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: 'success', path: path });
    });
};
