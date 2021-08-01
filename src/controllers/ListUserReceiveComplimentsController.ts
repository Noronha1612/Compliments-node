import { Request, Response } from 'express';
import { StatusCodes } from './StatusCodes';
import { ListUserReceiveComplimentsService } from '../services';

export class ListUserReceiveComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listUserReceiveComplimentsService =
      new ListUserReceiveComplimentsService();

    const compliments = await listUserReceiveComplimentsService.execute(
      user_id
    );

    return response.status(StatusCodes.OK).json({ compliments });
  }
}
