import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Your personal blogging platform</h1>
            <Link to="/login">Start blogging now!</Link>
        </div>
    );
}

export default Home;
