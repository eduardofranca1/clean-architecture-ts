import { Request, Response } from 'express';
import { Controller } from '../../../application/ports/controllers/controller';
import { DefaultError } from '../../../application/errors/default-error';

export const expressRouteAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response) => {
    return Promise.resolve(
      controller.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
      }),
    )
      .then((controllerResponse) => {
        response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body);
      })
      .catch((error: DefaultError) => {
        response.status(error.statusCode).json(error.message);
      });
  };
};
