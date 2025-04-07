import { DefaultError } from './default-error';

export class RequestValidationError extends DefaultError {
  statusCode = 400;
  name = 'RequestValidationError';
}
