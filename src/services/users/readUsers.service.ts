import { Repository } from 'typeorm';
import { TReadUsers } from '../../interfaces/users.interfaces';
import { AppDataSource } from '../../data-source';
import { User } from '../../entities';
import { readUsersSchema } from '../../schemas/users.schema';

const readUsersService = async (): Promise<TReadUsers> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] = await userRepo.find();

  const usersReturn: TReadUsers = readUsersSchema.parse(users);

  return usersReturn;
};

export { readUsersService };
