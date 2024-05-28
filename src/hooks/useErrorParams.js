import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useErrorParams() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error(error);
      const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);
      toast.error(`Error: ${errorMessage}`, {
        duration: 5000,
      });
    }
  }, [searchParams]);

  return {
    error: searchParams.get('error'),
  };
}
