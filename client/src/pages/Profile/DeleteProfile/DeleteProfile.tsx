// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../../features/userSlice';

// CSS
import classes from './DeleteProfile.module.css';

// Interfaces
import { IRootState } from '../../../app/store';

function DeleteProfile() {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const dispatch = useDispatch();

    const handleDeleteUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:5000/user`, {
                method: 'DELETE',
                headers: {
                    token: token,
                },
            });
            dispatch(userActions.setIsLoggedOut());
            localStorage.removeItem('token');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h2>Delete your profile</h2>
            <p>
                If you would like to permanently erase your username and blog
                posts with no way to retrieve them again in the future, you can
                delete your account.
            </p>
            <form
                className={classes['delete-profile-form']}
                onSubmit={handleDeleteUser}
            >
                <button className={classes['delete-profile-button']}>
                    Delete your profile
                </button>
            </form>
        </>
    );
}

export default DeleteProfile;
