import { StatusCodes } from './StatusCodes';
import { ListUserSendComplimentsService } from './../services/ListUserSendComplimentsService';
import { Request, Response } from 'express';

export class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const compliments = await listUserSendComplimentsService.execute(user_id);

    return response.status(StatusCodes.OK).json({ compliments });
  }
}
