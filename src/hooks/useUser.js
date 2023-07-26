'use client'
import { getCookies } from 'cookies-next';
import { decode } from 'next-auth/jwt';
import { useState, useEffect } from 'react';
import userImage from '@/public/user.jpg';

const useUser = () => {
    const [user, setUser] = useState({
        name: 'Minimalist',
        email: 'email@minimalist.com',
        picture: userImage
    });

    useEffect(() => {
        async function fetchData() {
            const {session} = getCookies(process.env.JWT_NAME);
            const user = await decode({token: session, secret: process.env.JWT_SECRET});
            const {name, email, picture} = user;
            setUser({name, email, picture});
        }
        fetchData();
    }, []);
    return {user};
}

export default useUser;