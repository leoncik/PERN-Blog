// Routing
import { NavLink } from 'react-router-dom';

// CSS
import classes from './Navigation.module.css';

function Navigation() {
    return (
        <nav className={classes['main-navigation']}>
            <div className={classes['navigation-logo']}>
                <NavLink to="/">Scribissimus</NavLink>
            </div>
            <div className={classes['navigation-links']}>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/profile">Profile</NavLink>
            </div>
        </nav>
    );
}

export default Navigation;
