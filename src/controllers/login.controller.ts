import { Request, Response } from 'express';
import { TLoginReq, TLoginRes } from '../interfaces/login.interfaces';
import { createSesionService } from '../services/login/createSession.service';

const createSessionController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const loginData: TLoginReq = req.body;

  const token: TLoginRes = await createSesionService(loginData);

  return res.json(token);
};

export { createSessionController };
