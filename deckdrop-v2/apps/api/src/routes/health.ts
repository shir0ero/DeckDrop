import { Router } from 'express';
import { dbPool } from '../lib/db';

const healthRouter = Router();

healthRouter.get('/health', async (_req, res, next) => {
  try {
    await dbPool.query('SELECT 1');
    res.status(200).json({
      success: true,
      service: 'deckdrop-api',
      status: 'ok'
    });
  } catch (error) {
    next(error);
  }
});

export default healthRouter;
