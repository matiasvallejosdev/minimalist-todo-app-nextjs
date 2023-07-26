import jwt from "jsonwebtoken";
import axios from "axios";

// Check if JWT token is expired
export const isJwtExpired = (token) => {
    // Offset by 60 seconds, so we will check if the token is "almost expired".
    const currentTime = Math.round(Date.now() / 1000 + 60);
    const decoded = jwt.decode(token);

    if (decoded["exp"]) {
        const adjustedExpiry = decoded["exp"];

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

// Create URL from multiple endpoints
export const makeUrl = (...endpoints) => {
    return endpoints.reduce((prevUrl, currentPath) => {
        if (prevUrl.length === 0) {
            return prevUrl + currentPath;
        }

        return prevUrl.endsWith("/")
            ? prevUrl + currentPath + "/"
            : prevUrl + "/" + currentPath + "/";
    }, "");
};

// Refresh JWT token
export const refreshToken = async function (refreshToken) {
    try {
        const url = makeUrl(
            process.env.BASE_URL,
            "auth",
            "token",
            "refresh",
        )

        const response = await axios.post(
            // "http://localhost:8000/api/auth/token/refresh/",
            makeUrl(
                process.env.BASE_URL,
                "auth",
                "token",
                "refresh",
            ),
            {
                refresh: refreshToken,
            },
        );

        const {access, refresh} = response.data;
        // Still within this block, return true
        return [access, refresh];
    } catch {
        // Error occurred, return null
        return [null, null];
    }
};