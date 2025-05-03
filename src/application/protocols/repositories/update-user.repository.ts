export interface UpdateUserRepository {
  update(id: string, user: { name: string; email: string }): Promise<void>;
}
