'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-muted-foreground mb-8">{error.message || 'An unexpected error occurred.'}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
