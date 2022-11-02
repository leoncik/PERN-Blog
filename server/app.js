const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const { query } = require('express');

const app = express();

// Middleware
app.use(cors())
app.use(express.json()) // Allows to access req.body;

// ROUTES

// Create a blog post
app.post('/posts', async(req, res) => {
    try {
        const { title, content } = req.body;
        const newBlogPost = await pool.query("INSERT INTO blog_posts (title, content) VALUES($1, $2) RETURNING *", [title, content]);
        res.json(newBlogPost.rows[0]);
        
    } catch (err) {
        console.error(err.message)
        
    }

})

// Select all blog posts
app.get('/posts', async(req, res) => {
    try {
        const allBlogPosts = await pool.query("SELECT * FROM blog_posts");
        res.json(allBlogPosts.rows)        
    } catch (err) {
        console.error(err.message)
    }
})

// Select a blog post by id
app.get('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const blogPost = await pool.query("SELECT * FROM blog_posts WHERE id = $1", [id]);
        res.json(blogPost.rows[0]);
        
    } catch (err) {
        console.error(error.message)
    }
})

// Edit a blog post
app.put('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        // Todo : set title AND content of the blog
        const updateBlogPost = await pool.query("UPDATE blog_posts SET title = $1 WHERE id = $2", [title, id]);
        res.json("Blog post has been updated successfully.");
        
    } catch (err) {
        console.error(err.message);
    }
})
// Delete a blog post
app.delete('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const deleteBlogPost = await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
        res.json("Blog post has been deleted successfully.");
    } catch (err) {
        console.error(err.message);        
    }
})


app.listen(5000, () => {
    console.log('Listening for requests on port 5000');
})

app.get('/', (req, res) => {
    try {
        res.send('<p>Test.</p>');
        
    } catch (error) {
        console.log(error);
        
    }
})