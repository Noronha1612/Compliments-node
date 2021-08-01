import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { routes } from './routes';
import { startDBConnection } from './database';
import { RequestError } from './models/RequestError';
import { StatusCodes } from './controllers/StatusCodes';
import { CelebrateError, errors, isCelebrateError } from 'celebrate';

config();

startDBConnection().then(() => {
  const port = 3333;

  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(routes);
  app.use((err: RequestError | CelebrateError, request: Request, response: Response, next: NextFunction) => {
    if (isCelebrateError(err)) {
      return response
        .status(StatusCodes.BAD_REQUEST)
        .json(err.details.get('body')?.details[0]);
    }

    if (isNaN(err.code)) console.log(err);
    
    return response
      .status(err.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
