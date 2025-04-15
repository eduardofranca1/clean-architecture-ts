import { DefaultError } from './default-error';

export class NotFoundError extends DefaultError {
  statusCode = 400;
  name = 'NotFoundError';
}
