import { NextFunction, Request, Response } from 'express';
import { logger } from '../lib/logger';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error('Unhandled request error:', error.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}
