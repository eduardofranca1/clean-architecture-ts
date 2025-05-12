import { RequestValidationError } from '@/application/errors/request-validator-error';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';

export class UpdateUserFieldsValidation extends ValidationComposite<{ name: string; email: string }> {
  async validate(request: { name?: string; email?: string }): Promise<void> | never {
    const { name, email } = request;

    if (!this.isValidField(name)) {
      throw new RequestValidationError('Name is required');
    }

    if (!this.isValidField(email)) {
      throw new RequestValidationError('E-mail is required');
    }
  }

  private isValidField(field: unknown): boolean {
    if (typeof field === 'undefined') return true;
    if (typeof field !== 'string') return false;
    if (field === '') return false;
    return true;
  }
}
