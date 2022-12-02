const pool = require('../config/db');

exports.getAllPosts = async (req, res) => {
    try {
        const allBlogPosts = await pool.query(
            `SELECT blog_posts.id, blog_posts.title, blog_posts.content FROM users
             LEFT JOIN blog_posts ON users.id = blog_posts.user_id
             WHERE users.id = $1`,
            [req.user.id]
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
            [title, content, req.user.id]
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
        const { title, content } = req.body;
        // Update a blog post if the id of the post matches user's id.
        const updateBlogPost = await pool.query(
            'UPDATE blog_posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [title, content, id, req.user.id]
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
            'DELETE FROM blog_posts WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (deleteBlogPost.rows.length === 0) {
            return res.json('This blog post does not match the current user.');
        }

        res.json('Blog post has been deleted successfully.');
    } catch (err) {
        console.error(err.message);
    }
};
