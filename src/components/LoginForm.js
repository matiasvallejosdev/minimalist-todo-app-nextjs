'use client'
import { setCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import {postLogin} from "@/src/services/User";

export default function LoginForm(){
    // TODO: add data validation and error handling
    const  {push} = useRouter();
    const [data, setData] = useState({
        'email': '',
        'password': ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const dataJson = {
            email: data['email'],
            password: data['password']
        }
        // postLogin(dataJson)
        //     .then(response => {
        //         if (response.success) {
        //             router.push('/lists')
        //             return response.data
        //         } else {
        //             throw new Error('Failed to fetch data from API');
        //         }
        //     })
        push('/lists')
        setCookie("token", "e13b39bb3d556bb985be5d1f79fcbcca856e62ae", {expires: new Date(Date.now() + 2 * 60 * 60 * 1000)})
    }

    return <>
        <form className="form" id="form-sigin" method="POST" action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 rounded-md"
                    placeholder="Your email"
                    onChange={(e)=> handleChange(e)}
                    value={data["email"]}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 rounded-md"
                    placeholder="Your password"
                    onChange={(e)=> handleChange(e)}
                    value={data["password"]}
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Remember Me
                    </label>
                </div>
                <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                >
                    Forgot Password?
                </a>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 rounded-md"
            >
                Login
            </button>
        </form>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
            Don't have an account?{' '}
            <a href="#" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                Sign Up
            </a>
        </p>
    </>
}