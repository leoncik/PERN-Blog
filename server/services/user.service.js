const fs = require('fs');
const imgPath = require('../app');

const {
    getProfileDb,
    editUsernameDb,
    getPreviousAvatarDb,
    updateAvatarDb,
    deleteAccountDb,
} = require('../db/user.db');

class UserService {
    getProfile = async (req, res) => {
        try {
            return await getProfileDb(req);
        } catch (error) {
            return res.status(500).send('Server error.');
        }
    };

    editProfile = async (req, res) => {
        try {
            editUsernameDb(req);
        } catch (error) {
            return res.status(500).send('Server error.');
        }
    };

    sendAvatar = async (req, res) => {
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }

        const previousAvatar = await getPreviousAvatarDb(req);

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

        updateAvatarDb(cleanedFileName, req);

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
            const response = { status: 'success', path: path };
            return response;
        });
    };

    deleteAccount = async (req, res) => {
        try {
            deleteAccountDb(req);
        } catch (err) {
            return res.status(400).send('Invalid user value.');
        }
    };
}

module.exports = new UserService();
