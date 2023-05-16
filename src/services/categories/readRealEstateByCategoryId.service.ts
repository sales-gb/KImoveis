import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';

const readRealEstateByCategoryIdService = async (
  categoryId: number,
): Promise<Category> => {
  const realEstateRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const realEstates: Category | null = await realEstateRepo
    .createQueryBuilder('category')
    .leftJoinAndSelect('category.realEstate', 'realEstate')
    .where('category.id = :categoryId', { categoryId })
    .getOne();

  return realEstates!;
};

export { readRealEstateByCategoryIdService };
