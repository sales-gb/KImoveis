import { Repository } from 'typeorm';
import { TUserRes, TUserUpdate } from '../../interfaces/users.interfaces';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';
import { userSchemaRes } from '../../schemas/users.schema';

const updateUserService = async (
  userData: TUserUpdate,
  id: number,
): Promise<TUserRes> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepo.findOneBy({
    id: id,
  });

  const newUserData: User = userRepo.create({
    ...oldUserData,
    ...userData,
  });

  await userRepo.save(newUserData);

  const userReturn: TUserRes = userSchemaRes.parse(newUserData);

  return userReturn;
};

export { updateUserService };
