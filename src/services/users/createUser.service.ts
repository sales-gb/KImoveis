import { Repository } from 'typeorm';
import { TUserReq, TUserRes } from '../../interfaces/users.interfaces';
import { AppDataSource } from '../../data-source';
import { userSchemaRes } from '../../schemas/users.schema';
import { User } from '../../entities';

const createUserService = async (userData: TUserReq): Promise<TUserRes> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepo.create(userData);
  await userRepo.save(user);

  const userReturn: TUserRes = userSchemaRes.parse(user);

  return userReturn;
};

export { createUserService };
