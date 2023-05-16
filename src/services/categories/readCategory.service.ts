import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';
import { TReadCategory } from '../../interfaces/categories.interfaces';
import { readCategorySchema } from '../../schemas/categories.schema';

const readCategoriesService = async (): Promise<TReadCategory> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categories: Category[] = await categoryRepo.find();

  const categoryReturn: TReadCategory = readCategorySchema.parse(categories);

  return categoryReturn;
};

export { readCategoriesService };
