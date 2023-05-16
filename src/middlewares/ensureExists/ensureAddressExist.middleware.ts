import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Address } from '../../entities';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../error';

const ensureAddressExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { street, number } = req.body.address;

  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const verifyAddress: Address | null = await addressRepo.findOne({
    where: {
      street: street,
      number: number,
    },
  });

  if (verifyAddress) {
    throw new AppError('Address already exists', 409);
  }

  return next();
};

export { ensureAddressExistMiddleware };
