import { RequestValidationError } from '@/application/errors/request-validator-error';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';
import { isEmptyString } from '@/common/helpers/strings/is-empty';
import { isString } from '@/common/helpers/strings/is-string';
import { CreateUserParams } from '@/domain/models/create-user';

export class UserRequiredFieldsValidation extends ValidationComposite<CreateUserParams> {
  async validate(request: CreateUserParams): Promise<void> | never {
    const { name, email } = request;

    if (!isString(name) || isEmptyString(name) || !name) {
      throw new RequestValidationError('Name is required');
    }

    if (!isString(email) || isEmptyString(email) || !email) {
      throw new RequestValidationError('E-mail is required');
    }
  }
}
