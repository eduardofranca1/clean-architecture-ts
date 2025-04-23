import { InternalServerError } from '@/application/errors/internal-server-error';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';
import { CreateUserParams } from '@/domain/models/create-user';

export class UserCompositeValidation extends ValidationComposite<CreateUserParams> {
  protected validations: ValidationComposite[] = [];

  add(...validations: ValidationComposite[]) {
    validations.forEach((validation) => this.validations.push(validation));
  }

  async validate(request: CreateUserParams): Promise<void> | never {
    if (this.validations.length === 0) {
      throw new InternalServerError('Composite has no validations');
    }

    for (const validation of this.validations) {
      await validation.validate(request);
    }
  }
}
