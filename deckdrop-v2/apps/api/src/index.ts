import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { verifyDbConnectionWithRetry } from './lib/db';
import { logger } from './lib/logger';
import { errorHandler } from './middleware/error-handler';
import healthRouter from './routes/health';

async function bootstrap(): Promise<void> {
  await verifyDbConnectionWithRetry();

  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('combined'));

  app.use(healthRouter);

  app.use(errorHandler);

  app.listen(env.PORT, () => {
    logger.info(`API is running on port ${env.PORT}`);
  });
}

bootstrap().catch(error => {
  logger.error('Fatal startup error:', error);
  process.exit(1);
});
