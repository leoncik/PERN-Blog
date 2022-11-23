// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../features/slices/userSlice';

// React Hooks
import { useRef } from 'react';

// CSS
import classes from './Login.module.css';

// Page components
import Layout from '../../components/layout/Layout/Layout';

// Routing
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Helpers
import {
    authenticatedRequest,
    genericPostRequest,
} from '../../helpers/fetchHandlers';
import * as endpoint from '../../helpers/apiEndpoints';

// Interfaces
import { IRootState } from '../../store';

function Login() {
    // Redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );

    // Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        };
        console.log(formData);

        const requestResponse: any = await genericPostRequest(
            endpoint.userLoginEndpoint,
            formData
        );

        console.log(requestResponse);

        const token = requestResponse.data.token;
        dispatch(userActions.setToken(token));

        // Retrieve user's profile
        const userProfile = await authenticatedRequest(
            'GET',
            endpoint.userProfileEndpoint,
            token
        );
        console.log(userProfile);

        dispatch(userActions.setIsLoggedIn(userProfile.username));
    };

    return !isLoggedIn ? (
        <Layout>
            <div>
                <h1>Welcome back to Scribissimus !</h1>
                <form onSubmit={handleLogin} className={classes['login-form']}>
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="text" id="email" />

                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="password" id="password" />
                    <button>Login</button>
                </form>
                <Link to="/register">
                    You don't have an account yet ? Create one !
                </Link>
            </div>
        </Layout>
    ) : (
        <Navigate replace to="/blog" />
    );
}

export default Login;
