import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: process.env.ENV_FILE || '.env' });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  DB_CONNECT_RETRIES: z.coerce.number().int().positive().default(5),
  DB_CONNECT_RETRY_DELAY_MS: z.coerce.number().int().positive().default(3000)
});

export const env = envSchema.parse(process.env);
