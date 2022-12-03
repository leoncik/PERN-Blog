// React Hooks
import { useRef, useEffect } from 'react';

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

// CSS
import classes from './Profile.module.css';

// Assets
import defaultAvatar from '../../assets/images/defaultAvatar.svg';
import Separator from '../../components/layout/Separator/Separator';

function Profile() {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const username = useSelector((state: IRootState) => state.user.username);
    const avatar = useSelector((state: IRootState) => state.user.avatar);
    const registredDate = useSelector(
        (state: IRootState) => state.user.registeredDate
    );
    const blogPosts = useSelector(
        (state: IRootState) => state.blogPosts?.blogPosts
    );
    const dispatch = useDispatch();

    // Refs
    const usernameRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement|null>(null);

    // Local states
    const baseAvatarSrc = 'http://localhost:5000/images/avatar/';

    // Get user's profile data
    useEffect(() => {
        const fetchProfile = async () => {
            const userProfile = await authenticatedRequest(
                'GET',
                endpoint.userProfileEndpoint,
                token
            );
            dispatch(userActions.setProfile(userProfile));
        };

        fetchProfile();
    }, []);

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

    const handleUploadAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (fileRef.current?.files !== null && fileRef.current?.files[0]) {
            const formData = new FormData();
            formData.append('file', fileRef.current?.files[0]);
            formData.append('fileName', fileRef.current?.files[0].name);

            await authenticatedRequest(
                'POST/File',
                endpoint.userUploadAvatarEndpoint,
                token,
                formData
            );
            if (fileRef.current !== null && fileRef.current.files !== null)
                dispatch(
                    userActions.updateAvatar(fileRef.current?.files[0].name)
                );
        }
    };

    const handleDeleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/user`, {
                method: 'DELETE',
                headers: {
                    token: token,
                },
            });
            dispatch(userActions.deleteUser());
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    };

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <Layout>
            <div>
                <h1>Welcome to your profile, {username}</h1>
                <h2>Overview</h2>
                <section className={classes['overview']}>
                    <div className={classes['stats']}>
                        <p>
                            Member since : 
                            <span className={classes['stat-value']}>
                                {new Date(registredDate).getDate() +
                                    '/' +
                                    (new Date(registredDate).getMonth() + 1) +
                                    '/' +
                                    new Date(registredDate).getFullYear()}
                            </span>
                        </p>
                        <p>
                            Number of posts written : 
                            <span className={classes['stat-value']}>
                                {blogPosts !== null && blogPosts !== undefined
                                    ? blogPosts.length
                                    : 0}
                            </span>
                        </p>
                    </div>
                    <div className={classes['frame']}>
                        <img
                            className={classes['avatar-picture']}
                            src={
                                avatar ? baseAvatarSrc + avatar : defaultAvatar
                            }
                            alt="Your profile picture."
                        />
                    </div>
                </section>
                {/* Display a default avatar if user has not upload his own */}

                <Separator />

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
                        <label
                            className={classes['profile-label']}
                            htmlFor="avatar-upload"
                        >
                            Upload your profile picture
                        </label>
                        <input
                            ref={fileRef}
                            type="file"
                            name="uploaded_file"
                            accept="jpg jpeg png webp"
                            id="avatar-upload"
                        />

                        <button>Upload avatar</button>
                    </form>
                </section>

                <Separator />

                <h2>Delete your profile</h2>
                <p>
                    If you would like to permanently erase your username and
                    blog posts with no way to retrieve them again in the future,
                    you can delete your account.
                </p>
                <form
                    className={classes['delete-profile-form']}
                    onSubmit={handleDeleteUser}
                >
                    <button className={classes['delete-profile-button']}>
                        Delete your profile
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Profile;
