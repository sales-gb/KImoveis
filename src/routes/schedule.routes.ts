import { Router } from 'express';
import { ensureDataIsValidMiddleware } from '../middlewares/validated/ensureDataIsValid.middleware';
import { scheduleSchemaReq } from '../schemas/schedules.schema';
import {
  createScheduleController,
  readScheduleByRealEstateIdController,
} from '../controllers/schedules.controller';
import { ensureTokenIsValidMiddleware } from '../middlewares/validated/ensureTokenIssValidMiddleware';
import { ensureScheduleExistMiddleware } from '../middlewares/ensureExists/ensureScheduleExist.middleware';
import { ensureUserHasScheduleMiddleware } from '../middlewares/ensureExists/ensureUserHasSchedule.middleware';
import { ensureIsComercialDayMiddleware } from '../middlewares/validated/ensureIsComercialDay.middleware';
import { ensureIsComercialHourMiddleware } from '../middlewares/validated/ensureIsComercialHour.middleware';
import { ensureUserIsAdminMiddleware } from '../middlewares/permission/ensureIsAdmin.middleware';

const scheduleRoute: Router = Router();

scheduleRoute.post(
  '',
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(scheduleSchemaReq),
  ensureScheduleExistMiddleware,
  ensureUserHasScheduleMiddleware,
  ensureIsComercialDayMiddleware,
  ensureIsComercialHourMiddleware,
  createScheduleController,
);

scheduleRoute.get(
  '/realEstate/:id',
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  readScheduleByRealEstateIdController,
);

export { scheduleRoute };
