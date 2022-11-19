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
 * Fetch blog posts from a user
 * Request type : GET
 * @returns {string} Returns the endpoint for the user's blog posts.
 */
const userBlogPostsEndpoint = `${apiBaseUrl}/posts`;

export { userLoginEndpoint, userProfileEndpoint, userBlogPostsEndpoint };