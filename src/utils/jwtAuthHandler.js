// src/utils/jwtHandler.js
import { ENDPOINTS } from '../env';
import { isJwtExpired } from '@/src/utils/jwtUtils';

export async function handleGoogleLogin(account) {
  const { access_token: accessToken, id_token: idToken } = account;

  try {
    const response = await fetch(ENDPOINTS.googleLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken, id_token: idToken }),
    });

    const data = await response.json();
    return {
      accessToken: data.access,
      refreshToken: data.refresh,
    };
  } catch (error) {
    console.error('Google login error:', error);
    return null;
  }
}
export async function handleGithubLogin(account) {
  const { access_token: accessToken } = account;

  try {
    const response = await fetch(ENDPOINTS.githubLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: accessToken }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub login failed:', errorData);
      throw new Error(`GitHub login failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      accessToken: data.access,
      refreshToken: data.refresh,
    };
  } catch (error) {
    console.error('GitHub login error:', error);
    return null;
  }
}

export async function refreshTokenIfNeeded(token) {
  if (isJwtExpired(token.accessToken)) {
    const [newAccessToken, newRefreshToken] = await refreshToken(token.refreshToken);

    if (newAccessToken && newRefreshToken) {
      return {
        ...token,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
      };
    }
    return { ...token, exp: 0 };
  }
  return token;
}
