import { Repository } from 'typeorm';
import {
  TCategory,
  TCategoryReq,
} from '../../interfaces/categories.interfaces';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';
import { categorySchema } from '../../schemas/categories.schema';

const createCategoryService = async (
  categoryData: TCategoryReq,
): Promise<TCategory> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const category: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(category);

  const categoryReturn: TCategory = categorySchema.parse(category);

  return categoryReturn;
};

export { createCategoryService };
