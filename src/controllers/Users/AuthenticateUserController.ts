import { Request, Response } from 'express';
import { AuthenticateUserService } from '../../services/Users/AuthenticateUserService';
import { StatusCodes } from '../StatusCodes';

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute({ email, password });

    return response.status(StatusCodes.CREATED).json({ token });
  }
}
