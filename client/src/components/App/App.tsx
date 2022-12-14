// React Hooks
import { useEffect } from 'react';

// Redux
import { userActions } from '../../features/userSlice';

// Routing
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Error404 from '../../pages/Error404/Error404';

// Page components
import Navigation from '../layout/Navigation/Navigation';
import Blog from '../../pages/Blog/Blog';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';

// Helpers
import * as endpoint from '../../helpers/apiEndpoints';
import { useDispatch } from 'react-redux';

function App() {
    // Redux
    const dispatch = useDispatch();

    const checkAuthentication = async () => {
        try {
            const response = await fetch(endpoint.checkTokenEndpoint, {
                method: 'GET',
                headers: { token: localStorage.token },
            });
            const isAuthenticated = await response.json();
            if (isAuthenticated === true) {
                dispatch(userActions.setToken(localStorage.token));
                dispatch(userActions.setIsLoggedIn());
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default App;
