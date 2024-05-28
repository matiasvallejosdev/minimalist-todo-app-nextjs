import { BASE_URL, getHeaders, handleResponse, logError } from '@/utils/apiUtils';

export const getTasks = async (accessToken, { slug }) => {
  const url = slug === 'upcoming' ? `${BASE_URL}/tasks/upcoming` : `${BASE_URL}/tasks?list=${slug}`;

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

export const countTasks = async (accessToken, { slug }) => {
  const url = `${BASE_URL}/tasks/count?list=${slug}`;

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

export const updateTask = async (accessToken, id, data) => {
  const url = `${BASE_URL}/tasks/${id}/`;

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

export const deleteTask = async (accessToken, id) => {
  const url = `${BASE_URL}/tasks/${id}/`;
  console.log(url);

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

export const createSimpleTask = async (accessToken, data) => {
  const url = `${BASE_URL}/tasks/`;
  // check if data.task_list is in ['inbox', 'upcoming', 'today', 'week', 'month', 'year']
  if (['inbox', 'upcoming'].includes(data.task_list)) {
    // remove task_list from data
    delete data.task_list;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(accessToken),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    logError(error);
    throw error;
  }
};
