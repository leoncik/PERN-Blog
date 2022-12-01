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
    const [error, setError] = useState<any>(null);

    // Redux
    const dispatch = useDispatch();

    const login = async (
        loginEndpoint: string,
        data: any
    ) => {
        setIsLoading(true);
        setError(null);
        const requestResponse: any = await genericPostRequest(
            loginEndpoint,
            data
        );

        if (requestResponse.data.status === 200) {
            // Save token in Redux's store and local storage
            const token = requestResponse.data.token;
            localStorage.setItem('token', token);
            dispatch(userActions.setToken(token));
            dispatch(userActions.setIsLoggedIn());
            setIsLoading(false);
        } else {
            setError('Your email or password is incorrect.')
        }
        setIsLoading(false);


    };

    return { login, isLoading, error };
};
