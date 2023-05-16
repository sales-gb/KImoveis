import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';
import { User } from '../../entities';

const ensureUserExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userId: number = parseInt(req.params.id);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return next();
};

export { ensureUserExistMiddleware };
