// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../features/userSlice';

// React Hooks
import { useRef, useState } from 'react';

// Helpers
import * as endpoint from '../../../helpers/apiEndpoints';
import { authenticatedRequest } from '../../../helpers/fetchHandlers';

// CSS
import classes from './EditProfile.module.css';

// Assets
import uploadIcon from '../../../assets/icons/cloud-upload-sharp.svg';

// Interfaces
import { IRootState } from '../../../app/store';

function EditProfile() {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const dispatch = useDispatch();

    // Refs
    const usernameRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    // Edit username
    const editUsername = async () => {
        try {
            const body = {
                username: usernameRef.current?.value,
            };
            await fetch(endpoint.userProfileUsernameEndpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: token,
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredCUsername = usernameRef.current?.value;
        editUsername();
        dispatch(userActions.editUsername(enteredCUsername));
        // Empty input after submission
        if (usernameRef.current) usernameRef.current.value = '';
    };

    const handleUploadAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (fileRef.current?.files !== null && fileRef.current?.files[0]) {
            const formData = new FormData();
            const cleanedFileName = fileRef.current?.files[0].name
                .replace(/à|â/g, 'a')
                .replace(/é|è|ê/g, 'e')
                .replace(/î/g, 'i')
                .replace(/ô/g, 'o')
                .replace(/û|ù/g, 'u')
                .split(' ')
                .join('_');
            formData.append('file', fileRef.current?.files[0], cleanedFileName);

            await authenticatedRequest(
                'POST/File',
                endpoint.userUploadAvatarEndpoint,
                token,
                formData
            );
            if (fileRef.current !== null && fileRef.current.files !== null)
                dispatch(userActions.updateAvatar(cleanedFileName));
            setFileName('Your avatar has been updated.');
        }
    };

    const handleFileChange = (e: any) => {
        setFileName(e.target.value.replace('C:\\fakepath\\', ''));
    };

    // Local states
    const [fileName, setFileName] = useState('No file chosen.');

    return (
        <>
            <h2>Edit your profile</h2>
            <section className={classes['edit-profile']}>
                <form
                    className={classes['edit-profile-form']}
                    onSubmit={handleSubmit}
                >
                    <label
                        className={classes['profile-label']}
                        htmlFor="post-title"
                    >
                        Change your username
                    </label>
                    <input
                        className={classes['username-input']}
                        ref={usernameRef}
                        type="text"
                        id="post-title"
                    />

                    <button>Update username</button>
                </form>

                <form
                    onSubmit={handleUploadAvatar}
                    encType="multipart/form-data"
                >
                    <p className={classes['profile-label']}>
                        Upload your profile picture
                    </p>
                    <div className={classes['custom-file-container']}>
                        <label
                            htmlFor="avatar-upload"
                            className={classes['custom-file-button']}
                        >
                            <span>Select a profile picture</span>
                            <img
                                className={classes['upload-icon']}
                                src={uploadIcon}
                                alt=""
                            />
                        </label>
                        <input
                            ref={fileRef}
                            type="file"
                            name="uploaded_file"
                            accept="jpg jpeg png webp"
                            id="avatar-upload"
                            hidden={true}
                            onChange={handleFileChange}
                        />
                        <span className={classes['file-upload-text']}>
                            {fileName}
                        </span>
                    </div>

                    <button>Upload avatar</button>
                </form>
            </section>
        </>
    );
}

export default EditProfile;
