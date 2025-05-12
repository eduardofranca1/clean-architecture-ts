import { EmailValidationAdapter } from '@/common/adapters/validations/email-validation-adapter';
import { UserEmailValidator } from '../leaf/user-email-validation';
import { UpdateUserFieldsValidation } from '../leaf/update-user-fields-validation';
import { UserCompositeValidation } from './user-composite-validation';

export class UpdateUserValidation extends UserCompositeValidation {
  constructor() {
    super();
    this.add(new UpdateUserFieldsValidation(), new UserEmailValidator(new EmailValidationAdapter()));
  }
}
