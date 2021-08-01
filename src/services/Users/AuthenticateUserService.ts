import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { UsersRepository } from './../../repositories/UsersRepository';
import { RequestError } from './../../models/RequestError';
import { User } from './../../entities/User';
import { StatusCodes } from '../../controllers/StatusCodes';

type AuthenticateRequest = Pick<User, 'email' | 'password'>;

export class AuthenticateUserService {
  async execute({ email, password }: AuthenticateRequest) {
    if (!process.env.TOKEN_SECRET_KEY) {
      throw new RequestError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Token key missing'
      );
    }

    if (!email || !password) {
      throw new RequestError(
        StatusCodes.BAD_REQUEST,
        'Missing email or password'
      );
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new RequestError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new RequestError(StatusCodes.NOT_FOUND, 'Invalid password');
    }

    const token = sign({ email }, process.env.TOKEN_SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}
