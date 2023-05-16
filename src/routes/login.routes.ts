import { Router } from 'express';
import { createSessionController } from '../controllers/login.controller';
import { ensureDataIsValidMiddleware } from '../middlewares/validated/ensureDataIsValid.middleware';
import { loginSchema } from '../schemas/login.schema';

const loginRoutes: Router = Router();

loginRoutes.post(
  '',
  ensureDataIsValidMiddleware(loginSchema),
  createSessionController,
);

export { loginRoutes };
