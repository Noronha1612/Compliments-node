import { TagsRepository } from './../../repositories/TagsRepository';
import { UsersRepository } from './../../repositories/UsersRepository';
import { StatusCodes } from './../../controllers/StatusCodes';
import { ComplimentsRepository } from './../../repositories/ComplimentsRepository';
import { Compliment, Tag, User } from './../../entities';
import { RequestError } from '../../models/RequestError';
import { getCustomRepository } from 'typeorm';

interface CreateComplimentParams {
  userSenderId?: Compliment['user_sender'];
  tagId: Compliment['tag_id'];
  userReceiverId: Compliment['user_receiver'];
  message: Compliment['message'];
}

export class CreateComplimentService {
  async execute({ tagId, userSenderId, userReceiverId, message }: CreateComplimentParams) {
    if (!userSenderId) {
      throw new RequestError(StatusCodes.UNAUTHORIZED, 'User not authenticated');
    }

    if (userReceiverId === userSenderId) {
      throw new RequestError(StatusCodes.FORBIDDEN, 'You cannot compliment yourself');
    }

    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const tagsRepository = getCustomRepository(TagsRepository);

    const userReceiverExists = await usersRepository.findOne(userReceiverId);
    const tagExists = await tagsRepository.findOne(tagId);

    if (!userReceiverExists) {
      throw new RequestError(StatusCodes.NOT_FOUND, 'User receiver does not exists');
    }
    if (!tagExists) {
      throw new RequestError(StatusCodes.NOT_FOUND, 'Tag does not exists');
    }

    const complimentToBeInserted = complimentsRepository.create({
      tag_id: tagId,
      user_sender: userSenderId,
      user_receiver: userReceiverId,
      message,
    });

    const insertedCompliment = await complimentsRepository.save(complimentToBeInserted);

    return insertedCompliment;
  }
}
