import { ResponseHandler } from '../protocols/responses/response-handler';
import { ResponseModel } from '../protocols/responses/response-model';

export class GenericNoContentResponse implements ResponseHandler<void> {
  async response(): Promise<ResponseModel<void>> {
    const responseData = {
      statusCode: 204,
      body: undefined,
    };
    return responseData;
  }
}
