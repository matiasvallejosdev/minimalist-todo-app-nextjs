import {decode} from "next-auth/jwt";
import {cookies} from "next/headers";

export async function isUserAuthenticated(accessToken){
    const url = `${process.env.BASE_URL}/auth/verify/`;

    const data = await fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })

    return data.ok === true;
}

export async function getAccessTokenServer() {
    const cookieStore = cookies();
    const cookie = cookieStore.get(process.env.JWT_NAME);
    const {value} = cookie;

    const user = await decode({token: value, secret: process.env.JWT_SECRET});
    const {accessToken} = user;
    return accessToken;
}

export async function getUserFromServer(){
    const cookieStore = cookies();
    const cookie = cookieStore.get(process.env.JWT_NAME);
    const {value} = cookie;

    const user = await decode({token: value, secret: process.env.JWT_SECRET});
    return user
}