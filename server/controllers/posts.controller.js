const {
    getAllPostsDb,
    createPostDb,
    editPostDb,
    deletePostDb,
} = require('../db/posts.db');

exports.getAllPosts = async (req, res) => {
    try {
        const allBlogPosts = await getAllPostsDb(req);
        res.json(allBlogPosts);
    } catch (err) {
        console.error(err.message);
    }
};

exports.createPost = async (req, res) => {
    try {
        const newBlogPost = await createPostDb(req);
        res.json(newBlogPost);
    } catch (err) {
        console.error(err.message);
    }
};

exports.editPost = async (req, res) => {
    try {
        const updateBlogPost = await editPostDb(req);

        if (updateBlogPost.length === 0) {
            return res.json('This blog post does not match the current user.');
        }

        res.json('Blog post has been updated successfully.');
    } catch (err) {
        console.error(err.message);
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedBlogPost = deletePostDb(req);

        if (deletedBlogPost.length === 0) {
            return res.json('This blog post does not match the current user.');
        }

        res.json('Blog post has been deleted successfully.');
    } catch (err) {
        console.error(err.message);
    }
};
