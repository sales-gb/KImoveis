import { Request, Response } from 'express';
import { createScheduleService } from '../services/schedules/createSchedule.service';
import { readScheduleByRealEstateIdService } from '../services/schedules/readScheduleByRealEstate.service';

const createScheduleController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const scheduleData = req.body;
  const userId = parseInt(res.locals.token.id);
  const newSchedule = await createScheduleService(scheduleData, userId);

  return res.status(201).json(newSchedule);
};

const readScheduleByRealEstateIdController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const realEstateId: number = parseInt(req.params.id);
  const schedules = await readScheduleByRealEstateIdService(realEstateId);

  return res.json(schedules);
};

export { createScheduleController, readScheduleByRealEstateIdController };
