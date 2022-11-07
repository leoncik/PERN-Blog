const express = require('express');
const cors = require('cors');

const postRoutes = require('./routes/posts.routes');
const jwtAuthRoutes = require('./routes/jwtAuth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows to access req.body;
app.use('/posts', postRoutes);
app.use('/register', jwtAuthRoutes);

app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
});
