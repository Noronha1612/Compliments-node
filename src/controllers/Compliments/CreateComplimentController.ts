import { Request, Response } from 'express';
import { Compliment } from '../../entities';
import { CreateComplimentService } from '../../services';
import { StatusCodes } from '../StatusCodes';

interface RequestBody {
  message: Compliment['message'];
  tagId: Compliment['tag_id'];
  userReceiverId: Compliment['user_receiver'];
}

export class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { message, tagId, userReceiverId } =
      request.body as RequestBody;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      userReceiverId,
      userSenderId: request.user_id,
      tagId,
      message,
    });

    return response.status(StatusCodes.CREATED).json({ compliment });
  }
}
