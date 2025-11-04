// A simple logger utility. In a real enterprise app, this would
// integrate with a logging service like Sentry, Datadog, or LogRocket.

const log = (level: 'log' | 'warn' | 'error', message: string, ...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console[level](`[${level.toUpperCase()}] ${message}`, ...args);
  }
  // Production logging service integration would go here.
  // For example: Sentry.captureMessage(message);
};

export const logger = {
  log: (message: string, ...args: unknown[]) => log('log', message, ...args),
  warn: (message: string, ...args:unknown[]) => log('warn', message, ...args),
  error: (message: string, ...args: unknown[]) => log('error', message, ...args),
};
