const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Image directory path
const imgPath = __dirname + '/images/';
module.exports = imgPath;

// Routes
const postRoutes = require('./routes/posts.routes');
const jwtAuthRoutes = require('./routes/jwtAuth.routes');
const loginRoutes = require('./routes/login.routes');
const verifyTokenRoutes = require('./routes/verify-token.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Allows to access req.body;
app.use(fileUpload()); // Allows to access req.file;
app.use('/images', express.static('images')); // Allows to serve static files
app.use('/posts', postRoutes);
app.use('/register', jwtAuthRoutes);
app.use('/login', loginRoutes);
app.use('/verify-token', verifyTokenRoutes);
app.use('/user', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
});
