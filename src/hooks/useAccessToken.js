'use client'
import {decode} from "next-auth/jwt";
import {useEffect, useState} from "react";
import {getCookies} from "cookies-next";

const getAccessTokenFromClient = async () => {
    const cookie = getCookies(process.env.JWT_NAME);
    const {value} = cookie;
    const user = await decode({token: value, secret: process.env.JWT_SECRET});
    const {accessToken} = user;
    return await accessToken;
}

export default function useAccessToken(){
    const [token, setToken] = useState('');

    useEffect(() => {
        getAccessTokenFromClient()
            .then((accessToken) => {
                setToken(accessToken);
            });
    }, [token === '']);

    return {token};
}