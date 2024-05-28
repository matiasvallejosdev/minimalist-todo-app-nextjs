// services/authApi.js

import { BASE_URL, getHeaders, handleResponse, logError } from '@/utils/apiUtils';

export const getConnection = async (token) => {
  const url = `${BASE_URL}/auth/connection/`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(token),
    });
    return response.ok;
  } catch (error) {
    logError(error);
    return JSON.stringify({ success: false, message: 'authentication failed' });
  }
};

export const postLogin = async (dataJson) => {
  const url = `${BASE_URL}/auth/token/`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(null, false),
      body: JSON.stringify(dataJson),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export const getUserMe = async (token) => {
  const url = `${BASE_URL}/auth/me/`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(token),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};
