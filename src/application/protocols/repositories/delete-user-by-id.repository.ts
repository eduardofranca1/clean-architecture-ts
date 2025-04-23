export interface IDeleteUserByIdRepository {
  deleteById(id: string): Promise<void>;
}
