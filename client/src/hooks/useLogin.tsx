// React states
import { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { userActions } from '../features/userSlice';

// Helpers
import {
    genericPostRequest,
    authenticatedRequest,
} from '../helpers/fetchHandlers';

export const useLogin = () => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Redux
    const dispatch = useDispatch();

    const login = async (
        loginEndpoint: string,
        data: any,
        profileEndpoint: string
    ) => {
        setIsLoading(true);
        setError(null);
        const requestResponse: any = await genericPostRequest(
            loginEndpoint,
            data
        );

        console.log(requestResponse);

        const token = requestResponse.data.token;
        dispatch(userActions.setToken(token));

        // Retrieve user's profile
        const userProfile = await authenticatedRequest(
            'GET',
            profileEndpoint,
            token
        );
        console.log(userProfile);

        dispatch(userActions.setIsLoggedIn(userProfile));
        setIsLoading(false);
    };

    return { login, isLoading, error };
};
