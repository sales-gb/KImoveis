import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  readUserController,
  updateUserController,
} from '../controllers/users.controllers';
import { ensureDataIsValidMiddleware } from '../middlewares/validated/ensureDataIsValid.middleware';
import { userSchemaReq, userSchemaUpdate } from '../schemas/users.schema';
import { ensureTokenIsValidMiddleware } from '../middlewares/validated/ensureTokenIssValidMiddleware';
import { ensureUserIsAdminMiddleware } from '../middlewares/permission/ensureIsAdmin.middleware';
import { ensureEmailExistMiddleware } from '../middlewares/ensureExists/ensureEmailExist.middleware';
import { ensureUserHasPermission } from '../middlewares/permission/ensureUserHasPermission.middleware';
import { ensureUserExistMiddleware } from '../middlewares/ensureExists/ensureUserExist.middleware';

const userRoutes: Router = Router();

userRoutes.post(
  '',
  ensureDataIsValidMiddleware(userSchemaReq),
  ensureEmailExistMiddleware,
  createUserController,
);
userRoutes.get(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  readUserController,
);
userRoutes.patch(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureUserExistMiddleware,
  ensureUserHasPermission,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  updateUserController,
);
userRoutes.delete(
  '/:id',
  ensureTokenIsValidMiddleware,
  ensureUserExistMiddleware,
  ensureUserIsAdminMiddleware,
  deleteUserController,
);

export { userRoutes };
