import jwt from 'jsonwebtoken';
import axios from 'axios';

// Check if JWT token is expired
export const isJwtExpired = (token) => {
  // Offset by 60 seconds, so we will check if the token is "almost expired".
  const currentTime = Math.round(Date.now() / 1000 + 60);
  const decoded = jwt.decode(token);

  if (decoded['exp']) {
    const adjustedExpiry = decoded['exp'];

    if (adjustedExpiry < currentTime) {
      // Token is expired
      return true;
    }
    // Token is not expired
    return false;
  }

  // Token is expired
  return true;
};
