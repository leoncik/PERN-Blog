const pool = require('../config/db');

exports.getAllPosts = async (req, res) => {
    try {
        const allBlogPosts = await pool.query('SELECT * FROM blog_posts');
        res.json(allBlogPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlogPost = await pool.query(
            'INSERT INTO blog_posts (title, content) VALUES($1, $2) RETURNING *',
            [title, content]
        );
        res.json(newBlogPost.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

exports.selectPost = async (req, res) => {
    try {
        const { id } = req.params;
        const blogPost = await pool.query(
            'SELECT * FROM blog_posts WHERE id = $1',
            [id]
        );
        res.json(blogPost.rows[0]);
    } catch (err) {
        console.error(err);
    }
};

exports.editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        // Todo : set title AND content of the blog
        const updateBlogPost = await pool.query(
            'UPDATE blog_posts SET title = $1 WHERE id = $2',
            [title, id]
        );
        res.json('Blog post has been updated successfully.');
    } catch (err) {
        console.error(err.message);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBlogPost = await pool.query(
            'DELETE FROM blog_posts WHERE id = $1',
            [id]
        );
        res.json('Blog post has been deleted successfully.');
    } catch (err) {
        console.error(err.message);
    }
};
