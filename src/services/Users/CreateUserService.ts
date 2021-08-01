import { hash } from 'bcryptjs';

import { StatusCodes } from './../../controllers/StatusCodes';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories';
import { User } from '../../entities';
import { RequestError } from '../../models/RequestError';

type UserRequest = Pick<User, 'admin' | 'email' | 'name' | 'password'>;

export class CreateUserService {
  async execute({ name, email, admin = false, password }: UserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists)
      throw new RequestError(StatusCodes.FORBIDDEN, 'User already exists');

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    const insertedUser = await usersRepository.save(user);

    return insertedUser;
  }
}
