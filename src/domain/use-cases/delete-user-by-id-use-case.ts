export interface IDeleteUserByIdUseCase {
  deleteById(id: string): Promise<void>;
}
