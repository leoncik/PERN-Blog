// React Hooks
import { useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../features/userSlice';

// Routing
import { Navigate } from 'react-router-dom';

// Page components
import Layout from '../../components/layout/Layout/Layout';

// Interfaces
import { IRootState } from '../../app/store';

// Helpers
import * as endpoint from '../../helpers/apiEndpoints';
import { authenticatedRequest } from '../../helpers/fetchHandlers';

function Profile() {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const username = useSelector((state: IRootState) => state.user.username);
    const dispatch = useDispatch();

    // Refs
    const usernameRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

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
    };

    const handleUploadAvatar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (fileRef.current?.files !== null && fileRef.current?.files[0]) {
            const formData = new FormData();
            formData.append('file', fileRef.current?.files[0]);
            formData.append('fileName', fileRef.current?.files[0].name);
            // console.log(fileRef.current?.value);
            // console.log(fileRef.current?.files[0]);
            authenticatedRequest(
                'POST/File',
                endpoint.userUploadAvatarEndpoint,
                token,
                formData
            );
        }
    };

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <Layout>
            <div>
                <h1>Welcome to your profile, {username}</h1>

                <h2>Edit your profile</h2>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="post-title">Change your username</label>
                        <input ref={usernameRef} type="text" id="post-title" />

                        <button>Update username</button>
                    </form>

                    <form onSubmit={handleUploadAvatar}>
                        <label htmlFor="avatar-upload">
                            Upload your profile picture
                        </label>
                        <input
                            ref={fileRef}
                            type="file"
                            accept=".jpg jpeg png webp"
                            id="avatar-upload"
                        />

                        <button>Upload avatar</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Profile;
