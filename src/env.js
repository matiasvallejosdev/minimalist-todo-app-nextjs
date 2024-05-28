import { makeUrl } from '@/src/utils/apiUtils';

export const BASE_URL = process.env.BASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_NAME = process.env.JWT_NAME;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const ENDPOINTS = {
  googleLogin: makeUrl(BASE_URL, 'auth', 'social', 'login', 'google'),
  githubLogin: makeUrl(BASE_URL, 'auth', 'social', 'login', 'github'),
};
