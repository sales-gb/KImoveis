import { z } from 'zod';
import { addressSchema, addressSchemaReq } from '../schemas/address.schema';

type TAddress = z.infer<typeof addressSchema>;
type TAddressReq = z.infer<typeof addressSchemaReq>;

export { TAddress, TAddressReq };
