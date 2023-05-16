import { z } from 'zod';
import {
  readUsersSchema,
  userSchema,
  userSchemaReq,
  userSchemaRes,
} from '../schemas/users.schema';
import { DeepPartial } from 'typeorm';

type TUser = z.infer<typeof userSchema>;
type TUserReq = z.infer<typeof userSchemaReq>;
type TUserRes = z.infer<typeof userSchemaRes>;
type TReadUsers = z.infer<typeof readUsersSchema>;
type TUserUpdate = DeepPartial<TUserReq>;

export { TUser, TUserReq, TUserRes, TReadUsers, TUserUpdate };
