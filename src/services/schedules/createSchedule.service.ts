import { Repository } from 'typeorm';
import { TScheduleReq } from '../../interfaces/schedules.interfaces';
import { RealEstate, Schedule, User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const createScheduleService = async (
  scheduleData: TScheduleReq,
  userId: number,
): Promise<{ message: string }> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const scheduleRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const user: User | null = await userRepo.findOneBy({ id: userId });
  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: scheduleData.realEstateId,
  });

  if (!realEstate) {
    throw new AppError('RealEstate not found', 404);
  }

  const schedule: Schedule = scheduleRepo.create({
    ...scheduleData,
    user: user!,
    realEstate: realEstate,
  });
  await scheduleRepo.save(schedule);

  return { message: 'Schedule created' };
};

export { createScheduleService };
