export interface DeleteUserByIdRepository {
  deleteById(id: string): Promise<void>;
}
