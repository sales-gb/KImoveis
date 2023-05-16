import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

type TEmail = {
  email: string;
};

const ensureEmailExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { email }: TEmail = req.body;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const verifyEmail: User | null = await userRepo.findOne({
    where: {
      email: email,
    },
  });

  if (verifyEmail) {
    throw new AppError('Email already exists', 409);
  }

  return next();
};

export { ensureEmailExistMiddleware };
