import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';
import { Router } from 'express';

import { ensureAuth } from './middlewares/ensureAuth';
import { AuthenticateUserController } from './controllers/Users/AuthenticateUserController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { CreateTagController } from './controllers/Tags/CreateTagController';
import { CreateUserController } from './controllers/Users/CreateUserController';
import { CreateComplimentController } from './controllers/Compliments/CreateComplimentController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { celebrate, Joi } from 'celebrate';

export const routes = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();

routes.get('/compliments/received', ensureAuth, listUserReceiveComplimentsController.handle);
routes.get('/compliments/sended', ensureAuth, listUserSendComplimentsController.handle);

routes.post(
  '/users',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().max(20),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      admin: Joi.boolean(),
    }),
  }),
  createUserController.handle
);
routes.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    }),
  }),
  authenticateUserController.handle
);
routes.post(
  '/tags',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().max(20),
    }),
  }),
  ensureAuth,
  ensureAdmin,
  createTagController.handle
);
routes.post('/compliments', celebrate({
  body: Joi.object().keys({
    userReceiverId: Joi.string().required(),
    tagId: Joi.string().required(),
    message: Joi.string().required(),
  })
}), ensureAuth, createComplimentController.handle);
