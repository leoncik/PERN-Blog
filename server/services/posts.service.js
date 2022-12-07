const {
    getAllPostsDb,
    createPostDb,
    editPostDb,
    deletePostDb,
} = require('../db/posts.db');

class PostsService {
    getAllPosts = async (req) => {
        try {
            const allBlogPosts = await getAllPostsDb(req);
            return allBlogPosts;
        } catch (err) {
            console.error(err);
        }
    };

    createPost = async (req) => {
        try {
            const newBlogPost = await createPostDb(req);
            return newBlogPost;
        } catch (err) {
            console.error(err);
        }
    };

    editPost = async (req, res) => {
        try {
            const updateBlogPost = await editPostDb(req);

            if (updateBlogPost.length === 0) {
                return res.json(
                    'This blog post does not match the current user.'
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    deletePost = async (req, res) => {
        try {
            const deletedBlogPost = await deletePostDb(req);

            if (deletedBlogPost.length === 0) {
                return res.json(
                    'This blog post does not match the current user.'
                );
            }
        } catch (err) {
            console.error(err);
        }
    };
}

module.exports = new PostsService();
