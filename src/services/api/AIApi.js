import { BASE_URL, getHeaders, logError, handleResponse } from '@/utils/apiUtils';

export const getCompletion = async (accessToken, text) => {
  const url = new URL(`${BASE_URL}/ai/autocomplete`);
  url.searchParams.append('input_text', text); // Add the parameter to the URL

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(accessToken),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};
