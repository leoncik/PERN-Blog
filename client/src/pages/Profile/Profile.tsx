// Redux
import { useSelector } from 'react-redux';

// Routing
import { Navigate } from 'react-router-dom';

function Profile() {
    // Redux
    const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
    const username = useSelector((state: any) => state.user.username);

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <div>
            <p>Welcome to your profile, {username}</p>
        </div>
    );
}

export default Profile;
