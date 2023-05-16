import { z } from 'zod';
import { scheduleSchema, scheduleSchemaReq } from '../schemas/schedules.schema';

type TSchedule = z.infer<typeof scheduleSchema>;
type TScheduleReq = z.infer<typeof scheduleSchemaReq>;

export { TSchedule, TScheduleReq };
