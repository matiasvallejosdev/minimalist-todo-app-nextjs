'use client'
import { useRouter } from 'next/navigation'

function LoginError({ error }) {
    const router = useRouter();

    function handleNavigate() {
        router.push('/login');
    }

    return (
        <div className="bg-red-500 text-white p-4">
            <h2 className="text-2xl mb-4">Login Error</h2>
            <p className="mb-4">{error}</p>
            <button
                className="bg-white text-red-500 py-2 px-4 rounded shadow"
                onClick={handleNavigate}
            >
                Go back to Login
            </button>
        </div>
    );
}

export default LoginError;