const pool = require('../config/db');

exports.getAllPostsDb = async (req) => {
    const { rows } = await pool.query(
        `SELECT blog_posts.id, blog_posts.title, blog_posts.content FROM users
             LEFT JOIN blog_posts ON users.id = blog_posts.user_id
             WHERE users.id = $1`,
        [req.user.id]
    );
    return rows;
};

exports.createPostDb = async (req) => {
    const { title, content } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO blog_posts (title, content, user_id)
             VALUES($1, $2, $3)
             RETURNING *`,
        [title, content, req.user.id]
    );
    return rows[0];
};

exports.editPostDb = async (req) => {
    const { id } = req.params;
    const { title, content } = req.body;
    // Update a blog post if the id of the post matches user's id.
    const { rows } = await pool.query(
        `UPDATE blog_posts SET title = $1, content = $2
             WHERE id = $3 AND user_id = $4
             RETURNING *`,
        [title, content, id, req.user.id]
    );
    return rows;
};

exports.deletePostDb = async (req) => {
    const { id } = req.params;
    const { rows } = await pool.query(
        `DELETE FROM blog_posts
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
        [id, req.user.id]
    );
    return rows;
};
