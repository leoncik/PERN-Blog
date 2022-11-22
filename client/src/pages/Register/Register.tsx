// React Hooks
import { useRef } from 'react';

// Helpers
import { genericPostRequest } from '../../helpers/fetchHandlers';

// CSS
import classes from './Register.module.css';

function Register() {
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

        await genericPostRequest('http://localhost:5000/register/', formData);
    };
    return (
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
    );
}

export default Register;
