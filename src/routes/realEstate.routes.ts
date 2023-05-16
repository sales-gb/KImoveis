import { Router } from 'express';
import {
  createRealEstateController,
  readRealEstateController,
} from '../controllers/realEstate.controller';
import { ensureDataIsValidMiddleware } from '../middlewares/validated/ensureDataIsValid.middleware';
import { realEstateSchemaReq } from '../schemas/realEstate.schema';
import { ensureTokenIsValidMiddleware } from '../middlewares/validated/ensureTokenIssValidMiddleware';
import { ensureUserIsAdminMiddleware } from '../middlewares/permission/ensureIsAdmin.middleware';
import { ensureAddressExistMiddleware } from '../middlewares/ensureExists/ensureAddressExist.middleware';

const realEstateRoute: Router = Router();

realEstateRoute.post(
  '',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureDataIsValidMiddleware(realEstateSchemaReq),
  ensureAddressExistMiddleware,
  createRealEstateController,
);
realEstateRoute.get('', readRealEstateController);

export { realEstateRoute };
