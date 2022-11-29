const pool = require('../config/db');
const imgPath = require('../app');
const fs = require('fs');

exports.getProfile = async (req, res) => {
    try {
        const profile = await pool.query(
            'SELECT username, avatar, registered_date FROM users WHERE id = $1',
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
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;
    const previousAvatar = await pool.query(
        `SELECT avatar FROM users
         WHERE id = $1`,
        [req.user]
    );
    const previousAvatarName = previousAvatar.rows[0].avatar;
    const newAvatar = await pool.query(
        `UPDATE users SET avatar = $1
             WHERE id = $2`,
        [file.name, req.user]
    );

    // Remove previous avatar file if It exists.
    if (fs.existsSync(imgPath + 'avatar/' + previousAvatarName)) {
        fs.unlink(imgPath + 'avatar/' + previousAvatarName, (err) => {
            if (err) throw err;
            console.log('Previous avatar deleted');
        });
    }

    // Write new avatar file.
    const path = imgPath + 'avatar/' + file.name;
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: 'success', path: path });
    });
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteBlogPosts = await pool.query(
            'DELETE FROM blog_posts WHERE user_id = $1',
            [req.user]
        );
        const deleteUser = await pool.query('DELETE FROM users WHERE id = $1', [
            req.user,
        ]);

        res.json('User and his blog posts has been deleted successfully.');
    } catch (err) {
        console.error(err.message);
    }
};
