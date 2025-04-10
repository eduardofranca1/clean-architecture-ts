import { EmailValidationAdapter } from '@/common/adapters/validations/email-validation-adapter';
import { UserEmailValidator } from '../leaf/user-email-validator';
import { UserCompositeValidation } from './user-composite-validation';

export class CreateUserValidation extends UserCompositeValidation {
  constructor() {
    super();
    this.add(new UserEmailValidator(new EmailValidationAdapter()));
  }
}
