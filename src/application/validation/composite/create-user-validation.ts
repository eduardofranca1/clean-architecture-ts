import { EmailValidationAdapter } from '@/common/adapters/validations/email-validation-adapter';
import { UserEmailValidator } from '../leaf/user-email-validation';
import { UserCompositeValidation } from './user-composite-validation';
import { UserRequiredFieldsValidation } from '../leaf/user-required-fields-validaton';

export class CreateUserValidation extends UserCompositeValidation {
  constructor() {
    super();
    this.add(
      new UserRequiredFieldsValidation(),
      new UserEmailValidator(new EmailValidationAdapter()),
    );
  }
}
