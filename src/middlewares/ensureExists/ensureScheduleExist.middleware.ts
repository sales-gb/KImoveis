import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Schedule } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const ensureScheduleExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { realEstateId, date, hour } = req.body;

  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const checkSchedule: Schedule | null = await scheduleRepo
    .createQueryBuilder('schedule')
    .where('schedule.realEstateId = :realEstateId', { realEstateId })
    .andWhere('schedule.date = :date', { date })
    .andWhere('schedule.hour = :hour', { hour })
    .getOne();

  if (checkSchedule) {
    throw new AppError(
      'Schedule to this real estate at this date and time already exists',
      409,
    );
  }

  return next();
};

export { ensureScheduleExistMiddleware };
