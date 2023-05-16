import { z } from 'zod';
import {
  readRealEstateSchemaRes,
  realEstateSchema,
  realEstateSchemaReq,
  realEstateSchemaRes,
  realEstateSchemaScheule,
} from '../schemas/realEstate.schema';

type TRealEstate = z.infer<typeof realEstateSchema>;
type TRealEstatReq = z.infer<typeof realEstateSchemaReq>;
type TRealEstateRes = z.infer<typeof realEstateSchemaRes>;
type TReadRealEstateRes = z.infer<typeof readRealEstateSchemaRes>;
type TRealEstateScheduleRes = z.infer<typeof realEstateSchemaScheule>;

export {
  TRealEstate,
  TRealEstatReq,
  TRealEstateRes,
  TReadRealEstateRes,
  TRealEstateScheduleRes,
};
