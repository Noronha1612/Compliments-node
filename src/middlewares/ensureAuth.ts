import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCodes } from '../controllers/StatusCodes';
import { RequestError } from '../models/RequestError';

interface TokenPayload {
  sub: string;
}

export const ensureAuth = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!process.env.TOKEN_SECRET_KEY)
    throw new RequestError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Token key missing'
    );

  const token = request.headers.authorization?.split(' ')[1];

  if (!token)
    throw new RequestError(StatusCodes.UNAUTHORIZED, 'User not authenticated');

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET_KEY) as TokenPayload;

    request.user_id = sub;
  } catch(err) {
    throw new RequestError(
      StatusCodes.UNAUTHORIZED,
      'Authentication expired'
    );
  }

  
  return next();
};
