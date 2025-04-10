export abstract class ValidationComposite<T = unknown> {
  abstract validate(args: T): Promise<void> | never;
}
