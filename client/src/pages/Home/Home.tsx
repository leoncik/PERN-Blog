import classes from './Home.module.css';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { genericPostRequest } from '../../helpers/fetchHandlers';

function Home() {
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
            'http://localhost:5000/login/',
            formData
        );

        console.log(requestResponse);
    };

    return (
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
    );
}

export default Home;
