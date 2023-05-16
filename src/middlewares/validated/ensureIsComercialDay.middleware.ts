import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';

const ensureIsComercialDayMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { date } = req.body;

  const dayWeek = new Date(date).getDay();

  if (dayWeek === 0 || dayWeek === 6) {
    throw new AppError('Invalid date, work days are monday to friday', 400);
  }

  return next();
};

export { ensureIsComercialDayMiddleware };
