'use client';
import { Button } from '@/src/components/ui/button';
import { IconLoader } from '@tabler/icons-react'; // Import IconLoader if used

import { useState } from 'react';

export default function SignInButton({ icon, text, handleLogin }) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <Button variant="default" className="w-80 text-md flex gap-2" disabled>
          <IconLoader size="20" className="animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button
          variant="default"
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            handleLogin();
          }}
          className="w-80 flex gap-3 text-md"
        >
          {icon}
          {text}
        </Button>
      )}
    </>
  );
}
