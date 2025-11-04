'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Global unhandled error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
          <h1 className="text-4xl font-bold mb-4">Application Error</h1>
          <p className="text-muted-foreground mb-8">A critical error occurred. Please try again.</p>
          <Button onClick={() => reset()}>Reload Application</Button>
        </div>
      </body>
    </html>
  );
}
