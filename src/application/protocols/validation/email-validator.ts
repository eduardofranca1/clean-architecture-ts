export interface EmailValidator {
  isEmail(email: string): Promise<boolean>;
}
