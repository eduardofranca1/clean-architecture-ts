import { EmailValidationError } from '@/application/errors/email-validator-error';
import { IEmailValidator } from '@/application/ports/validation/email-validator';
import { ValidationComposite } from '@/application/ports/validation/validation-composite';
import { CreateUserParams } from '@/domain/models/create-user';

export class UserEmailValidator extends ValidationComposite<CreateUserParams> {
  constructor(private readonly emailValidator: IEmailValidator) {
    super();
  }

  async validate(request?: CreateUserParams): Promise<void> | never {
    if (!request) {
      return;
    }

    const { email } = request;

    if (typeof email === 'undefined') {
      return;
    }

    if (!(await this.emailValidator.isEmail(email))) {
      throw new EmailValidationError('Invalid e-mail');
    }
  }
}
