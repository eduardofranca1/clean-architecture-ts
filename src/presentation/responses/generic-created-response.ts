import { ResponseHandler } from '../protocols/responses/response-handler';
import { ResponseModel } from '../protocols/responses/response-model';

export class GenericCreatedResponse<T> implements ResponseHandler<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    const responseData = {
      statusCode: 201,
      body,
    };
    return responseData;
  }
}
