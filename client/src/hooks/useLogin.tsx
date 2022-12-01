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

        // Save token in Redux's store and local storage
        const token = requestResponse.data.token;
        localStorage.setItem('token', token);
        dispatch(userActions.setToken(token));
        dispatch(userActions.setIsLoggedIn());
        setIsLoading(false);
    };

    return { login, isLoading, error };
};
