import { DefaultError } from './default-error';

export class UserExistsError extends DefaultError {
  statusCode = 400;
  name = 'UserExistsError';
}
