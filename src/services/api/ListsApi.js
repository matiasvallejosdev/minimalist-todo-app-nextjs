import { BASE_URL, getHeaders, handleResponse, logError } from '@/utils/apiUtils';

export const getLists = async (accessToken) => {
  const url = `${BASE_URL}/lists/`;

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

export const createList = async (accessToken, { name }) => {
  const url = `${BASE_URL}/lists/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(accessToken),
      body: JSON.stringify({ name }),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const deleteList = async (accessToken, pk) => {
  const url = `${BASE_URL}/lists/${pk}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(accessToken),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const updateList = async (accessToken, pk, data) => {
  const url = `${BASE_URL}/lists/${pk}/`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: getHeaders(accessToken),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const getList = async (accessToken, { slug }) => {
  const url = `${BASE_URL}/lists/${slug}`;

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
