import { Repository } from 'typeorm';
import { RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';

const readRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstates: RealEstate[] = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return realEstates;
};

export { readRealEstateService };
