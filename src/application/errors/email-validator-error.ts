import { DefaultError } from './default-error';

export class EmailValidationError extends DefaultError {
  statusCode = 400;
  name = 'EmailValidationError';
}
