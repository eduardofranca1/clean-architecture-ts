import validator from 'validator';
import { EmailValidator } from '@/application/protocols/validation/email-validator';

export class EmailValidationAdapter implements EmailValidator {
  async isEmail(email: string): Promise<boolean> {
    return validator.isEmail(email);
  }
}
