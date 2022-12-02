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

export const useRegister = () => {
    // States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    // Redux
    const dispatch = useDispatch();

    const register = async (
        registerEndpoint: string,
        data: any
    ) => {
        setIsLoading(true);
        setError(null);
        const response: any = await genericPostRequest(
            registerEndpoint,
            data
        );

        if (response.data.status === 200) {
            // Save token in Redux's store and local storage
            const token = response.data.token;
            dispatch(userActions.setToken(token));
            localStorage.setItem('token', token);
            dispatch(userActions.setIsLoggedIn());
            setIsLoading(false);
        } else {
            setError("Server error.")
        }
        setIsLoading(false);


    };

    return { register, isLoading, error };
};
