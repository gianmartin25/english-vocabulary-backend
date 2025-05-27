// src/infrastructure/user/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../models/user.model';
import { IUserRepository } from 'src/application/user/user.repository.interface';
import { UserEntity } from 'src/domain/user/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly ormRepo: Repository<UserModel>,
  ) {}

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const entity = this.ormRepo.create(user);
    const saved = await this.ormRepo.save(entity);
    return saved as UserEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.ormRepo.findOne({ where: { email } }) as Promise<UserEntity | null>;
  }
}