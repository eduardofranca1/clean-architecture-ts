import { ResponseHandler } from '../protocols/responses/response-handler';
import { ResponseModel } from '../protocols/responses/response-model';

export class GenericSuccessResponse<T> implements ResponseHandler<T> {
  async response(body: T): Promise<ResponseModel<T>> {
    const responseData = {
      statusCode: 200,
      body,
    };
    return responseData;
  }
}
