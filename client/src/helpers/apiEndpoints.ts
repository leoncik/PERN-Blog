const apiBaseUrl = 'http://localhost:5000';

/**
 * Send user login data.
 * Request type : POST
 * @returns {string} Returns the endpoint for the user login.
 */
const userLoginEndpoint = `${apiBaseUrl}/login`;

/**
 * Fetch a user profile
 * Request type : POST or PUT
 * @returns {string} Returns the endpoint for the user profile.
 */
const userProfileEndpoint = `${apiBaseUrl}/user/profile`;

/**
 * Upload user's avatar
 * Request type : POST
 * @returns {string} Returns the endpoint for the user's avatar upload.
 */
const userUploadAvatarEndpoint = `${apiBaseUrl}/user/profile/upload`;

/**
 * Edit a user's username
 * Request type : PUT
 * @returns {string} Returns the endpoint for the user's profile username.
 */
const userProfileUsernameEndpoint = `${apiBaseUrl}/user/profile/username`;

/**
 * Fetch blog posts from a user
 * Request type : GET
 * @returns {string} Returns the endpoint for the user's blog posts.
 */
const userBlogPostsEndpoint = `${apiBaseUrl}/posts`;

export {
    userLoginEndpoint,
    userProfileEndpoint,
    userBlogPostsEndpoint,
    userProfileUsernameEndpoint,
    userUploadAvatarEndpoint,
};
