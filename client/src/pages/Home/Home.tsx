// Routing
import { Link } from 'react-router-dom';

// Page components
import PageTitle from '../../components/layout/PageTitle/PageTitle';

// CSS
import classes from './Home.module.css';

// Assets
import feather from '../../assets/images/featherWriting.png';

function Home() {
    return (
        <div className={classes.hero}>
            <div className="hero-text">
                <h1>Your personal blogging platform</h1>
                <p>Write about anything, anywhere!</p>
                <Link className={classes['hero-link']} to="/login">
                    Start blogging now!
                </Link>
            </div>
            <div className="hero-image">
                <img className={classes['hero-image']} src={feather} alt="" />
            </div>
        </div>
    );
}

export default Home;
