'use client';
import { signIn } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { IconBrandGoogle, IconLoader } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { useState } from 'react';

export default function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    deleteCookie(process.env.JWT_NAME);
    signIn('google', { callbackUrl: '/lists/inbox' })
      .then(() => {
        toast.success('Successfully logged in');
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error logging in');
        console.error(error);
      });
  };

  return (
    <>
      {loading ? (
        <Button variant="default" className="w-80 text-md flex gap-2" disabled>
          <IconLoader size="20" className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button variant="default" onClick={handleLogin} className="w-80 flex gap-2">
          <IconBrandGoogle size="20" />
          Continue with Google
        </Button>
      )}
    </>
  );
}
// <button onClick={() =>{
//     return handleLogin();
// }}
//         className="btn btn-primary px-10 md:px-20 bg-blue-500 py-2 text-white rounded-md font-semibold flex gap-2 items-center justify-center">
//     <IconBrandGoogle size="20" />
//     Continue with Google
// </button>
