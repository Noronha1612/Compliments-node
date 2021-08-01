import { getCustomRepository } from 'typeorm';
import { UsersRepository } from './../repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from '../controllers/StatusCodes';

export  const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { user_id } = request;

  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne(user_id);

  if (!user || !user_id) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      message: 'User not authenticated',
    });
  }

  if (user.admin) return next();

  return response.status(StatusCodes.UNAUTHORIZED).json({
    message: 'User does not have permission',
  });
};
