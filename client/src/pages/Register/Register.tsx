// Redux
import { useSelector } from 'react-redux';

// React Hooks
import { useRef } from 'react';

// Custom Hooks
import { useRegister } from '../../hooks/useRegister';

// Routing
import { Navigate } from 'react-router-dom';

// Helpers
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

    // Custom Hooks
    const { register, isLoading, error } = useRegister();

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
        register(endpoint.registerEndpoint, formData);
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
                    <button disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Register'}
                    </button>
                </form>

                {error && (
                    <div className={classes['error-message']}>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </Layout>
    ) : (
        <Navigate replace to="/blog" />
    );
}

export default Register;
