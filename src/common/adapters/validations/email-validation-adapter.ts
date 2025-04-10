import validator from 'validator';

import { IEmailValidator } from '@/application/ports/validation/email-validator';

export class EmailValidationAdapter implements IEmailValidator {
  async isEmail(email: string): Promise<boolean> {
    return validator.isEmail(email);
  }
}
