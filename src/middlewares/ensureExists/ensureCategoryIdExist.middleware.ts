import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Category } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const ensureCategoryIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categoryId: number = parseInt(req.params.id);

  const category: Category | null = await categoryRepo.findOneBy({
    id: categoryId,
  });

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return next();
};

export { ensureCategoryIdExistMiddleware };
