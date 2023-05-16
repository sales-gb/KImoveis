import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  password: z.string().max(120),
  admin: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const userSchemaReq = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userSchemaRes = userSchema.omit({
  password: true,
});

const readUsersSchema = z.array(userSchemaRes);

const userSchemaUpdate = userSchemaReq.partial().omit({
  admin: true,
});

export {
  userSchema,
  userSchemaReq,
  userSchemaRes,
  readUsersSchema,
  userSchemaUpdate,
};
