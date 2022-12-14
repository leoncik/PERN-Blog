// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../features/userSlice';

// Routing
import { NavLink } from 'react-router-dom';

// CSS
import classes from './Navigation.module.css';

// Assets
import logo from '../../../assets/images/logo.png';

// Interfaces
import { IRootState } from '../../../app/store';

function Navigation() {
    // Redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );

    const handleLogout = () => {
        dispatch(userActions.setIsLoggedOut());
        localStorage.removeItem('token');
    };

    return (
        <nav className={classes['main-navigation']}>
            <div className={classes['navigation-logo']}>
                <NavLink to="/">
                    <img src={logo} alt="Scribissimus" />
                </NavLink>
            </div>
            {isLoggedIn && (
                <div className={classes['navigation-links']}>
                    <NavLink
                        to="/blog"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            textDecorationColor: isActive ? 'gold' : 'none',
                        })}
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="/profile"
                        style={({ isActive }) => ({
                            textDecoration: isActive ? 'underline' : 'none',
                            textDecorationColor: isActive ? 'gold' : 'none',
                        })}
                    >
                        Profile
                    </NavLink>
                    <NavLink onClick={handleLogout} to="/">
                        Log out
                    </NavLink>
                </div>
            )}
        </nav>
    );
}

export default Navigation;
