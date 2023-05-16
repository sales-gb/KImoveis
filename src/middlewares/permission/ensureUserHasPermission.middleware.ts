import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../error';

const ensureUserHasPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const admin = res.locals.token.admin;
  const idAdm = res.locals.token.id;
  const { id } = req.params;

  if (!admin && Number(idAdm) !== Number(id)) {
    throw new AppError('Insufficient permission', 403);
  }

  return next();
};

export { ensureUserHasPermission };
