const pool = require('../config/db');

// Todo (refactor) : edit payload of jwtGenerator in order to access user id with req.user.id instead of req.user.

// Get all posts from a specific user
exports.getAllPosts = async (req, res) => {
    try {
        console.log(req.user);
        const allBlogPosts = await pool.query(
            `SELECT * FROM users
             LEFT JOIN blog_posts ON users.id = blog_posts.user_id
             WHERE users.id = $1`,
            [req.user]
        );
        res.json(allBlogPosts.rows);
    } catch (err) {
        console.error(err.message);
    }
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlogPost = await pool.query(
            'INSERT INTO blog_posts (title, content, user_id) VALUES($1, $2, $3) RETURNING *',
            [title, content, req.user]
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
        // Update a blog post if the id of the post matches user's id.
        const updateBlogPost = await pool.query(
            'UPDATE blog_posts SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [title, id, req.user]
        );

        if (updateBlogPost.rows.length === 0) {
            return res.json('This blog post does not match the current user.');
        }

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
