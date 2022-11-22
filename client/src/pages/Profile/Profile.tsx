// Redux
import { useSelector } from 'react-redux';

// Routing
import { Navigate } from 'react-router-dom';

// Interfaces
import { IRootState } from '../../store';

function Profile() {
    // Redux
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const username = useSelector((state: IRootState) => state.user.username);

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <div>
            <p>Welcome to your profile, {username}</p>
        </div>
    );
}

export default Profile;
