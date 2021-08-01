import { StatusCodes } from './../controllers/StatusCodes';
import { RequestError } from './../models/RequestError';
import { getCustomRepository } from 'typeorm';
import { User } from './../entities/User';
import { ComplimentsRepository } from '../repositories';
import { filterUser } from '../utils/filterUser';

export class ListUserSendComplimentsService {
  async execute(user_id?: User['id']) {
    if (!user_id) throw new RequestError(StatusCodes.UNAUTHORIZED, 'User not authenticated');

    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = (
      await complimentsRepository.find({
        where: {
          user_sender: user_id,
        },
        relations: ['userSender', 'userReceiver', 'tag'],
      })
    ).map((compliment) => {
      const filteredUserSender = filterUser(compliment.userSender);
      const filteredUserReceiver = filterUser(compliment.userReceiver);

      return {
        ...compliment,
        userSender: {
          ...filteredUserSender,
        },
        userReceiver: {
          ...filteredUserReceiver,
        },
      };
    });
    
    return compliments
  }
}
