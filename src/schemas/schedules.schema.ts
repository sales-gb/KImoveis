import { z } from 'zod';

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
  userId: z.number(),
});

const scheduleSchemaReq = scheduleSchema.omit({
  id: true,
  userId: true,
});

export { scheduleSchema, scheduleSchemaReq };
