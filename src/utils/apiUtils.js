export const BASE_URL = process.env.BASE_URL;

export const getHeaders = (accessToken) => ({
  Authorization: `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  cache: 'no-store',
});

export const handleResponse = async (response) => {
  if (response.ok) {
    if (response.status === 204) {
      return null; // No content to return
    }
    return response.json();
  } else {
    const data = await response.json();
    const errorMessage = data.message || 'Unknown error occurred';
    throw new Error(errorMessage);
  }
};

export const logError = (error) => {
  console.error('API Error:', error.message);
};

export const makeUrl = (...endpoints) => {
  return endpoints.reduce((prevUrl, currentPath) => {
    if (prevUrl.length === 0) {
      return prevUrl + currentPath;
    }

    return prevUrl.endsWith('/') ? prevUrl + currentPath + '/' : prevUrl + '/' + currentPath + '/';
  }, '');
};
