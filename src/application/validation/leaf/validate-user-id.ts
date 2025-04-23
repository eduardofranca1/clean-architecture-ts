import { RequestValidationError } from '@/application/errors/request-validator-error';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';

export class ValidateUserID extends ValidationComposite<string> {
  async validate(value: string): Promise<void> | never {
    if (typeof value !== 'string' || !value) {
      throw new RequestValidationError('Invalid user ID');
    }
  }
}
