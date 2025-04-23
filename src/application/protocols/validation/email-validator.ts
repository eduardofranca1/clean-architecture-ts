export interface IEmailValidator {
  isEmail(email: string): Promise<boolean>;
}
