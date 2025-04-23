import { RequestValidationError } from '@/application/errors/request-validator-error';
import { ValidationComposite } from '@/application/protocols/validation/validation-composite';
import { isAPositiveNumber } from '@/common/helpers/numbers/isAPositiveNumber';
import { FindAllUsersRequest } from '@/domain/use-cases/find-all-users-use-case';

export class FindAllUsersValidation extends ValidationComposite<FindAllUsersRequest> {
  async validate(request?: FindAllUsersRequest): Promise<void> | never {
    if (!request) {
      return;
    }

    if (request.orderBy && !this.verifyIfStringIsANumber(request.orderBy)) {
      throw new RequestValidationError('Order By must be string');
    }

    if (request.order && !request.order.match(/desc|asc/i)) {
      throw new RequestValidationError('Order must be asc or desc');
    }

    this.validatePositiveNumberIfExists('Limit', request.limit);
    this.validatePositiveNumberIfExists('Skip', request.skip);
  }

  private validatePositiveNumberIfExists(
    nameValue: string,
    value?: string | number,
  ): void {
    if (!value) return;

    if (!isAPositiveNumber(value)) {
      throw new RequestValidationError(
        `${nameValue} must be a positive number`,
      );
    }
  }

  private verifyIfStringIsANumber(value: string | number): boolean {
    if (!Number.isNaN(+value)) {
      if (typeof +value === 'number') {
        return false;
      }
    }
    return true;
  }
}
