import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const ensureUserHasScheduleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId = parseInt(res.locals.token.id);
  const { date, hour } = req.body;

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const checkUserSchedule: Schedule | null = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.userId = :userId', { userId })
    .andWhere('schedule.date = :date', { date })
    .andWhere('schedule.hour = :hour', { hour })
    .getOne();

  if (checkUserSchedule) {
    throw new AppError(
      'User schedule to this real estate at this date and time already exists',
      409,
    );
  }

  return next();
};

export { ensureUserHasScheduleMiddleware };
