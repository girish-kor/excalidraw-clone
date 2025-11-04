import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  // Server-side environment variables
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  // Client-side environment variables
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  // Runtime environment variables, available on both server and client
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Skip validation in certain environments
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
