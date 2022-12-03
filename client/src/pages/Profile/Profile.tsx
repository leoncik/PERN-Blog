// React Hooks
import { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../features/userSlice';

// Routing
import { Navigate } from 'react-router-dom';

// Page components
import Layout from '../../components/layout/Layout/Layout';
import Overview from './Overview/Overview';
import EditProfile from './EditProfile/EditProfile';
import DeleteProfile from './DeleteProfile/DeleteProfile';

// Interfaces
import { IRootState } from '../../app/store';

// Helpers
import * as endpoint from '../../helpers/apiEndpoints';
import { authenticatedRequest } from '../../helpers/fetchHandlers';

// Assets
import Separator from '../../components/layout/Separator/Separator';

function Profile() {
    // Redux
    const token = useSelector((state: IRootState) => state.user.token);
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const username = useSelector((state: IRootState) => state.user.username);
    const dispatch = useDispatch();

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

    return !isLoggedIn ? (
        <Navigate replace to="/" />
    ) : (
        <Layout>
            <div>
                <h1>Welcome to your profile, {username}</h1>
                <Overview />
                <Separator />
                <EditProfile />
                <Separator />
                <DeleteProfile />
            </div>
        </Layout>
    );
}

export default Profile;
