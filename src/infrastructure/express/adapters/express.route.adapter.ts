import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../application/ports/controllers/controller";

export const expressRouteAdapter = <T>(controller: Controller<T>) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      controller.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
      })
    )
      .then((controllerResponse) => {
        response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body);
        return next();
      })
      .catch((error: Error) => {
        return next(error);
      });
  };
};
