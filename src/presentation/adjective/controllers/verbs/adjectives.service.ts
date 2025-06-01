import { Injectable } from '@nestjs/common';
import { CreateVerbDto } from '../../dto/create-adjectives.dto';
import { UpdateVerbDto } from '../../dto/update-adjectives.dto';

@Injectable()
export class AdjectiveService {
  create(createVerbDto: CreateVerbDto) {
    return 'This action adds a new verb';
  }

  findAll() {
    return `This action returns all verbs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verb`;
  }

  update(id: number, updateVerbDto: UpdateVerbDto) {
    return `This action updates a #${id} verb`;
  }

  remove(id: number) {
    return `This action removes a #${id} verb`;
  }
}
