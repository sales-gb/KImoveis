import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';

const ensureIsComercialHourMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { hour } = req.body;

  const startHour: number = 8;
  const endHour: number = 18;

  const separeHour: string = hour.split(':');
  const convertHour: number = parseInt(separeHour[0], 10);

  if (convertHour < startHour || convertHour > endHour) {
    throw new AppError('Invalid hour, available times are 8AM to 18PM', 400);
  }

  return next();
};

export { ensureIsComercialHourMiddleware };
