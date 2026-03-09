import { Pool } from 'pg';
import { env } from '../config/env';
import { logger } from './logger';

export const dbPool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 60000,
  ssl: env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function verifyDbConnectionWithRetry(): Promise<void> {
  for (let attempt = 1; attempt <= env.DB_CONNECT_RETRIES; attempt += 1) {
    try {
      const client = await dbPool.connect();
      await client.query('SELECT 1');
      client.release();
      logger.info('Database connectivity verified.');
      return;
    } catch (error) {
      logger.warn(`DB connection attempt ${attempt}/${env.DB_CONNECT_RETRIES} failed.`);
      if (attempt === env.DB_CONNECT_RETRIES) {
        throw error;
      }
      await wait(env.DB_CONNECT_RETRY_DELAY_MS);
    }
  }
}
