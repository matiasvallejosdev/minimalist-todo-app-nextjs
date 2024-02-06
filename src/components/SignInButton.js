'use client'
import { signIn } from 'next-auth/react'
import { deleteCookie } from 'cookies-next';
import { IconBrandGoogle } from '@tabler/icons-react';

export default function SignInButton(){

    const handleLogin = () => {
        deleteCookie(process.env.JWT_NAME);
        signIn('google', {callbackUrl: '/lists/inbox'});
    }

    return(
        <button onClick={() =>{
            return handleLogin();
        }}
                className="btn btn-primary px-20 bg-blue-500 py-2 text-white rounded-md font-semibold flex gap-2 items-center justify-center">
            <IconBrandGoogle size="20" />
            Continue with Google
        </button>
    )
}