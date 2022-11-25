/**
 * Fetches data from url.
 * @param {string} apiEndpoint - Fetched url
 * @param requestBody  - body send with POST method
 * @returns {}
 */
export const genericPostRequest = async (
    apiEndpoint: string,
    requestBody: any
) => {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        return { data };
    } catch {
        return false;
    }
};

/**
 * Fetches data from url.
 * @param {string} apiEndpoint - Fetched url with GET method
 * @returns {}
 */
export const genericFetchRequest = async (apiEndPoint: string) => {
    try {
        const response = await fetch(apiEndPoint);
        const data = response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// Todo : refactor into smaller functions.
/**
 * Send a POST request to authenticate user.
 * @param {string} method - fetch method
 * @param {string} apiEndpoint - Fetched URL
 * @param {string} token - user's token
 * @returns
 */
export const authenticatedRequest = async (
    method: string,
    apiEndpoint: string,
    token: string,
    requestBody = {}
) => {
    switch (method) {
        case 'GET':
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'GET',
                    headers: {
                        token: token,
                    },
                });
                const data = await response.json();
                return data;
            } catch (err) {
                console.log(err);
                return false;
            }
        case 'POST':
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                return { data };
            } catch {
                return false;
            }
        case 'POST/File':
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        // ? Does not work when setting content-type explicitly
                        // ? Error : Multipart: Boundary not found
                        // 'Content-Type': 'multipart/form-data',
                        token: token,
                    },
                    body: JSON.stringify(requestBody),
                });
                const data = await response.json();
                return { data };
            } catch {
                return false;
            }

        default:
            break;
    }
};
