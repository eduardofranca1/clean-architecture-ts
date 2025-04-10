interface ErrorResponseModel {
  statusCode: number;
}

export class DefaultError extends Error implements ErrorResponseModel {
  public statusCode = 500;
  public messages: string[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || this.name;
    this.name = 'DefaultError';
    this.messages.push(this.message);
  }
}
