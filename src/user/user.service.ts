import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _repository: Repository<UserEntity>
  ) { }
  async getAgent(username, fields: string[]) {
    this._repository
      .createQueryBuilder().select(fields).where('username', username).getOne();
  }
}
