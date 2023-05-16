import { Router } from 'express';
import {
  createCategoryController,
  readCategoriesController,
  readRealEstateByCategoryIdController,
} from '../controllers/categories.controller';
import { ensureDataIsValidMiddleware } from '../middlewares/validated/ensureDataIsValid.middleware';
import { categorySchemaReq } from '../schemas/categories.schema';
import { ensureTokenIsValidMiddleware } from '../middlewares/validated/ensureTokenIssValidMiddleware';
import { ensureUserIsAdminMiddleware } from '../middlewares/permission/ensureIsAdmin.middleware';
import { ensureCategoryExistMiddleware } from '../middlewares/ensureExists/ensureCategoryExist.middleware';
import { ensureCategoryIdExistMiddleware } from '../middlewares/ensureExists/ensureCategoryIdExist.middleware';

const categoryRoutes: Router = Router();

categoryRoutes.post(
  '',
  ensureDataIsValidMiddleware(categorySchemaReq),
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureCategoryExistMiddleware,
  createCategoryController,
);
categoryRoutes.get('', readCategoriesController);
categoryRoutes.get(
  '/:id/realEstate',
  ensureCategoryIdExistMiddleware,
  readRealEstateByCategoryIdController,
);

export { categoryRoutes };
