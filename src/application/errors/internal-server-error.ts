import { DefaultError } from './default-error';

export class InternalServerError extends DefaultError {
  statusCode = 500;
  name = 'InternalServerError';
}
