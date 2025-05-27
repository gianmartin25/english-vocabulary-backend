// src/application/user/user.repository.interface.ts
import { UserEntity } from 'src/domain/user/user.entity';

export interface IUserRepository {
  create(user: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}