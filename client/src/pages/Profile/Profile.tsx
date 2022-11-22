// React Hooks
import { useRef } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../features/slices/userSlice';

// Routing
import { Navigate } from 'react-router-dom';

// Interfaces
import { IRootState } from '../../store';

// Helpers
import * as endpoint from '../../helpers/apiEndpoints';

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

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <div>
            <h1>Welcome to your profile, {username}</h1>
            <h2>Overview</h2>
            <div>
                <p>Member since :</p>
                <p>Avatar :</p>
                <p>Number of posts written :</p>
            </div>

            <h2>Edit your profile</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="post-title">Change your username</label>
                    <input ref={usernameRef} type="text" id="post-title" />

                    <button>Update username</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;
