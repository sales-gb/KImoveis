import { Repository } from 'typeorm';
import { TRealEstatReq } from '../../interfaces/realEstate.interfaces';
import { Address, Category, RealEstate } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const createRealEstateService = async (
  realEstateData: TRealEstatReq,
): Promise<RealEstate> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const addressData = realEstateData.address;
  const categoryId = realEstateData.categoryId;

  const category = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const newAddress: Address = addressRepo.create(addressData);
  await addressRepo.save(newAddress);

  const newRealEstateData = {
    ...realEstateData,
    address: newAddress,
    category: category,
  };

  const newRealEstate: RealEstate = realEstateRepo.create(newRealEstateData);
  await realEstateRepo.save(newRealEstate);

  return newRealEstate;
};

export { createRealEstateService };
