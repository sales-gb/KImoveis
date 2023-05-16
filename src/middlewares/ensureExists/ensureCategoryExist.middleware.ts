import { NextFunction, Request, Response } from 'express';
import { Category } from '../../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
type TName = {
  name: string;
};

const ensureCategoryExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { name }: TName = req.body;

  const categgoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const verifyCategory: Category | null = await categgoryRepo.findOne({
    where: {
      name: name,
    },
  });

  if (verifyCategory) {
    throw new AppError('Category already exists', 409);
  }

  return next();
};

export { ensureCategoryExistMiddleware };
