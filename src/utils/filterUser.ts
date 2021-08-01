import { User } from "../entities";

export const filterUser = (user: User) => {
  const userValidOutputFields = Object.keys(user).filter(
    (outputField) => outputField !== 'password' && outputField !== 'id'
  ) as (Exclude<keyof User, 'password'>)[];

  const filteredUserSender = userValidOutputFields.reduce((objAccumulator, item) => {
    return {
      ...objAccumulator,
      [item]: user[item],
    };
  }, {});

  return filteredUserSender;
}