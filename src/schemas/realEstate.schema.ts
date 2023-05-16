import { z } from 'zod';
import { addressSchemaReq, addressSchema } from './address.schema';
import { categorySchema } from './categories.schema';
import { scheduleSchema } from './schedules.schema';
import { userSchemaRes } from './users.schema';

const realEstateSchema = z.object({
  id: z.number(),
  sold: z.boolean().default(false),
  value: z.number().or(z.string()),
  size: z.number().positive(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  categoryId: z.number(),
});

const realEstateSchemaReq = realEstateSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: addressSchemaReq,
  });

const realEstateSchemaRes = realEstateSchema
  .omit({
    categoryId: true,
  })
  .extend({
    address: addressSchema,
    category: categorySchema,
  });

const realEstateSchemaScheule = realEstateSchema
  .omit({
    categoryId: true,
  })
  .extend({
    address: addressSchema,
    category: categorySchema,
    schedules: z.array(scheduleSchema.extend({ user: userSchemaRes })),
  });

const readRealEstateSchemaRes = z.array(realEstateSchemaRes);

export {
  realEstateSchema,
  realEstateSchemaReq,
  realEstateSchemaRes,
  readRealEstateSchemaRes,
  realEstateSchemaScheule,
};
