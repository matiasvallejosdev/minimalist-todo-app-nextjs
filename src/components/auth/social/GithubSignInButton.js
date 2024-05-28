'use client';
import SignInButton from '../SignInButton';
import { signIn } from 'next-auth/react';
import { deleteCookie } from 'cookies-next';
import { IconBrandGithub } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GithubSignInButton() {

  const handleLogin = () => {
    deleteCookie(process.env.JWT_NAME);
    signIn('github', { callbackUrl: '/lists/inbox' })
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
    <SignInButton
      icon={<IconBrandGithub size="20" />}
      text="Sign in with Github"
      handleLogin={handleLogin}
    />
  );
}
