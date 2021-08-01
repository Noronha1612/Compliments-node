import { StatusCodes } from './../controllers/StatusCodes';

export class RequestError extends Error {
  code: StatusCodes;

  constructor(code: StatusCodes, message?: string) {
    super(message);
    this.code = code;
  }
}