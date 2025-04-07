interface ErrorResponseModel {
  statusCode: number;
}

export class DefaultError extends Error implements ErrorResponseModel {
  public statusCode = 500;

  constructor(message?: string) {
    super(message);
    this.message = message || this.name;
    this.name = 'DefaultError';
  }
}
