import { getCustomRepository } from 'typeorm';
import { StatusCodes } from '../../controllers/StatusCodes';
import { Tag } from '../../entities';
import { RequestError } from '../../models/RequestError';
import { TagsRepository } from '../../repositories';

export class CreateTagService {
  async execute(tagName: Tag['name']) {
    if (!tagName)
      throw new RequestError(StatusCodes.BAD_REQUEST, 'Tag name is required');

    const tagsRepository = getCustomRepository(TagsRepository);

    const tagAlreadyExists = await tagsRepository.findOne({
      name: tagName,
    });

    if (tagAlreadyExists)
      throw new RequestError(StatusCodes.FORBIDDEN, 'Tag name already exists');

    const tagToBeInserted = tagsRepository.create({
      name: tagName,
    });

    const insertedTag = await tagsRepository.save(tagToBeInserted);

    return insertedTag;
  }
}
