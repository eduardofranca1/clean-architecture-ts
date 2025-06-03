export interface UpdateUserUseCase {
  update(id: string, user: { name?: string; email?: string }): Promise<void>;
}
