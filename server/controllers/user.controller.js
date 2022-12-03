const pool = require('../config/db');
const imgPath = require('../app');
const fs = require('fs');

exports.getProfile = async (req, res) => {
    try {
        const profile = await pool.query(
            `SELECT username, avatar, registered_date
             FROM users WHERE id = $1`,
            [req.user.id]
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
        await pool.query(
            `UPDATE users SET username = $1
             WHERE id = $2`,
            [username, req.user.id]
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

    const previousAvatar = await pool.query(
        `SELECT avatar FROM users
         WHERE id = $1`,
        [req.user.id]
    );

    // Update user with new avatar filename
    // We also replace empty spaces with underscores and some special characters in case this could not be done on the client side.
    const file = req.files.file;
    const cleanedFileName = file.name
        .replace(/à|â/g, 'a')
        .replace(/é|è|ê/g, 'e')
        .replace(/î/g, 'i')
        .replace(/ô/g, 'o')
        .replace(/û|ù/g, 'u')
        .split(' ')
        .join('_');
    await pool.query(
        `UPDATE users SET avatar = $1
         WHERE id = $2`,
        [cleanedFileName, req.user.id]
    );

    // Remove previous avatar file if It exists.
    const previousAvatarName = previousAvatar.rows[0].avatar;
    if (fs.existsSync(imgPath + 'avatar/' + previousAvatarName)) {
        fs.unlink(imgPath + 'avatar/' + previousAvatarName, (err) => {
            if (err) throw err;
            console.log('Previous avatar deleted');
        });
    }

    // Write new avatar file.
    const path = imgPath + 'avatar/' + cleanedFileName;
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.send({ status: 'success', path: path });
    });
};

exports.deleteUser = async (req, res) => {
    try {
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

        res.json('User and his blog posts has been deleted successfully.');
    } catch (err) {
        return res.status(400).send('Invalid user value.');
    }
};
