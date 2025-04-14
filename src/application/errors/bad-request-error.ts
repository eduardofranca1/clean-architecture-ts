import { DefaultError } from './default-error';

export class BadRequestError extends DefaultError {
  statusCode = 400;
  name = 'BadRequestError';
}
