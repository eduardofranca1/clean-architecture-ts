import { DefaultError } from './default-error';

export class NotFoundError extends DefaultError {
  statusCode = 404;
  name = 'NotFoundError';
}
