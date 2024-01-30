// noinspection JSCheckFunctionSignatures
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {makeUrl, isJwtExpired, refreshToken} from "../../../../src/utils/JwtUtilities";

const authOptions = {
    session: {
        jwt: true,
        maxAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    cookies: {
        sessionToken: {
            name: process.env.JWT_NAME,
            options: { httpOnly: false, sameSite: "lax", path: "/", secure: true },
        },
    },
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, account, profile}) {
            // user just signed in
            if (account) {
                // may have to switch it up a bit for other providers
                if (account.provider === "google") {
                    // extract these two tokens
                    const {access_token: accessToken, id_token: idToken} = account;
                    
                    // make a POST request to the DRF backend
                    try {
                        // tip: use a separate .ts file or json file to store such URL endpoints
                        // "http://127.0.0.1:8000/api/auth/social/login/google/",
                        const url = makeUrl(
                            process.env.BASE_URL,
                            "auth",
                            "social",
                            "login",
                            account.provider,
                        )
                        
                        const response = await fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                access_token: account.access_token, // note the differences in key and value variable names
                                id_token: account.id_token,
                            }),
                        }
                        );
                        
                        const data = await response.json();

                        // extract the returned token from the DRF backend and add it to the `user` object
                        const {access: access_token, refresh: refresh_token} = data;
                        // reform the `token` object from the access token we appended to the `user` object
                        token = {
                            ...token,
                            accessToken: access_token,
                            refreshToken: refresh_token,
                        };
                        return token;
                    } catch (error) {
                        console.error(error)
                        return null;
                    }
                }
            }

            // user was signed in previously, we want to check if the token needs refreshing
            // token has been invalidated, try refreshing it
            if (isJwtExpired(token.accessToken)) {
                const [
                    newAccessToken,
                    newRefreshToken,
                ] = await refreshToken(token.refreshToken);

                if (newAccessToken && newRefreshToken) {
                    token = {
                        ...token,
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
                    };

                    return token;
                }

                // unable to refresh tokens from DRF backend, invalidate the token
                return {
                    ...token,
                    exp: 0,
                };
            }

            // token valid
            return token;
        },

        async session({ session, user, token }) {
            // Send properties to the client, like an access_token from a provider.
            session.user = {
                idToken: token.idToken,
                name: session.user.name,
                email: session.user.email,
                accessToken: token.accessToken,
            };
            return session;
        },
    },
}

// @ts-ignore
const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}