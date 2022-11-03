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
