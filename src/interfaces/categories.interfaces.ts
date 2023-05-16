import { z } from 'zod';
import {
  categorySchema,
  categorySchemaReq,
  readCategorySchema,
} from '../schemas/categories.schema';

type TCategory = z.infer<typeof categorySchema>;
type TCategoryReq = z.infer<typeof categorySchemaReq>;
type TReadCategory = z.infer<typeof readCategorySchema>;

export { TCategory, TCategoryReq, TReadCategory };
