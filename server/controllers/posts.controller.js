const postsService = require('../services/posts.service');

exports.getAllPosts = async (req, res) => {
    const allBlogPosts = await postsService.getAllPosts(req);
    res.status(202).json(allBlogPosts);
};

exports.createPost = async (req, res) => {
    const newBlogPost = await postsService.createPost(req);
    res.json(newBlogPost);
};

exports.editPost = async (req, res) => {
    postsService.editPost(req);
    res.json('Blog post has been updated successfully.');
};

exports.deletePost = async (req, res) => {
    postsService.deletePost(req);
    res.json('Blog post has been deleted successfully.');
};
