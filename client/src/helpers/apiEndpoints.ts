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

export { userLoginEndpoint, userProfileEndpoint };
