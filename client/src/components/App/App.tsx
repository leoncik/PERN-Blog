// Routing
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import Profile from '../../pages/Profile/Profile';
import Error404 from '../../pages/Error404/Error404';

// Page components
import Navigation from '../layout/Navigation/Navigation';
import Blog from '../../pages/Blog/Blog';
import Register from '../../pages/Register/Register';

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </div>
    );
}

export default App;
