import { Request, Response } from 'express';
import {
  TUserReq,
  TUserRes,
  TUserUpdate,
} from '../interfaces/users.interfaces';
import { createUserService } from '../services/users/createUser.service';
import { readUsersService } from '../services/users/readUsers.service';
import { deleteUserService } from '../services/users/deleteUser.service';
import { updateUserService } from '../services/users/updateUser.service';

const createUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userData: TUserReq = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const readUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const users = await readUsersService();
  return res.json(users);
};

const updateUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userData: TUserUpdate = req.body;
  const { id } = req.params;
  const user: TUserRes = await updateUserService(userData, Number(id));

  return res.status(200).json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const userId: number = Number(req.params.id);

  await deleteUserService(userId);

  return res.status(204).send();
};

export {
  createUserController,
  readUserController,
  updateUserController,
  deleteUserController,
};
