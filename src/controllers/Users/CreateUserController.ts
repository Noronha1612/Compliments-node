import { Request, Response } from 'express';
import { User } from '../../entities/User';
import { CreateUserService } from '../../services/Users/CreateUserService';
import { StatusCodes } from '../StatusCodes';

type CreateUserRequestBody = Pick<
  User,
  'admin' | 'email' | 'name' | 'password'
>;

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, admin, name, password } = request.body as CreateUserRequestBody;
    const createUserService = new CreateUserService();

    const insertedUser = await createUserService.execute({
      email,
      name,
      admin,
      password
    });

    return response.status(StatusCodes.CREATED).json({ insertedUser });
  }
}
