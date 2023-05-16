import { Repository } from 'typeorm';
import { User } from '../../entities';
import { AppDataSource } from '../../data-source';

const deleteUserService = async (userId: number): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  await userRepo.softRemove(user!);
};

export { deleteUserService };
