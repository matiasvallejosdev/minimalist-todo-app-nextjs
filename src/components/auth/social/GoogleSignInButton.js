'use client';
import SignInButton from '../SignInButton';
import { signIn } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    deleteCookie(process.env.JWT_NAME);
    signIn('google', { callbackUrl: '/lists/inbox' })
      .then(() => {
        toast.success('Successfully logged in');
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Error logging in');
        console.error(error);
      });
  };

  return (
    <SignInButton
      icon={<IconBrandGoogle size="20" />}
      text="Sign in with Google"
      handleLogin={handleLogin}
      loading={loading}
    />
  );
}
