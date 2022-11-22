// Redux
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../features/slices/userSlice';

// Routing
import { NavLink } from 'react-router-dom';

// CSS
import classes from './Navigation.module.css';

// Interfaces
import { IRootState } from '../../../store';

function Navigation() {
    // Redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(
        (state: IRootState) => state.user.isLoggedIn
    );

    const handleLogout = () => {
        dispatch(userActions.setIsLoggedOut());
    };

    return (
        <nav className={classes['main-navigation']}>
            <div className={classes['navigation-logo']}>
                <NavLink to="/">Scribissimus</NavLink>
            </div>
            <div className={classes['navigation-links']}>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                {isLoggedIn && (
                    <NavLink onClick={handleLogout} to="/">
                        Log out
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
