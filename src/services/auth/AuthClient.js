import {decode} from "next-auth/jwt";
import {getCookie} from "cookies-next";

export const getAccessTokenClient = async () =>{
    const cookie = getCookie(process.env.JWT_NAME);
    if (!cookie) {
        throw new Error('Cookie is undefined');
    }
    const user = await decode({token: cookie, secret: process.env.JWT_SECRET});
    const {accessToken} = user;
    return accessToken;
}