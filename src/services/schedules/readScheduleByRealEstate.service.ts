import { Repository } from 'typeorm';
import { RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const readScheduleByRealEstateIdService = async (
  realEstateId: number,
): Promise<RealEstate> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates: RealEstate | null = await realEstateRepo
    .createQueryBuilder('realestate')
    .leftJoinAndSelect('realestate.address', 'address')
    .leftJoinAndSelect('realestate.category', 'category')
    .leftJoinAndSelect('realestate.schedules', 'schedules')
    .leftJoinAndSelect('schedules.user', 'user')
    .where('realestate.id = :realEstateId', { realEstateId })
    .getOne();

  if (!realEstates) {
    throw new AppError('RealEstate not found', 404);
  }

  return realEstates;
};

export { readScheduleByRealEstateIdService };
