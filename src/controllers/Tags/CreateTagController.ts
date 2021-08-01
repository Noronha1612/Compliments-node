import { Request, Response } from 'express';
import { Tag } from '../../entities';
import { CreateTagService } from '../../services';
import { StatusCodes } from '../StatusCodes';

type RequestBody = {
  name: Tag['name'];
};

export class CreateTagController {
  async handle(request: Request, response: Response) {
    const { name } = request.body as RequestBody;
    const createTagService = new CreateTagService();

    const insertedTag = await createTagService.execute(name);

    return response.status(StatusCodes.CREATED).json({ insertedTag });
  }
}
