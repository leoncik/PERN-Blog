// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../features/userSlice';

// React Hooks
import { useRef } from 'react';

// Routing
import { Navigate } from 'react-router-dom';

// Helpers
import {
    genericPostRequest,
    authenticatedRequest,
} from '../../helpers/fetchHandlers';
import * as endpoint from '../../helpers/apiEndpoints';

// Interfaces
import { IRootState } from '../../app/store';

// Page components
import Layout from '../../components/layout/Layout/Layout';

// CSS
import classes from './Register.module.css';

function Register() {
    // Redux
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );
    const dispatch = useDispatch();

    // Refs
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            username: usernameRef.current?.value,
        };
        console.log(formData);

        const response: any = await genericPostRequest(
            'http://localhost:5000/register/',
            formData
        );
        const token = response.data;
        dispatch(userActions.setToken(token));
        const newUserProfile = await authenticatedRequest(
            'GET',
            endpoint.userProfileEndpoint,
            token
        );
        dispatch(userActions.setIsLoggedIn(newUserProfile));
    };
    return !isLoggedIn ? (
        <Layout>
            <div>
                <h1>Create your account</h1>
                <form
                    onSubmit={handleRegister}
                    className={classes['register-form']}
                >
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} type="text" id="email" />

                    <label htmlFor="username">Username</label>
                    <input ref={usernameRef} type="text" id="username" />

                    <label htmlFor="password">Password</label>
                    <input ref={passwordRef} type="password" id="password" />
                    <button>Register</button>
                </form>
            </div>
        </Layout>
    ) : (
        <Navigate replace to="/blog" />
    );
}

export default Register;
