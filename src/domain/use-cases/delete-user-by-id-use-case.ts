export interface DeleteUserByIdUseCase {
  deleteById(id: string): Promise<void>;
}
