import { Injectable } from '@nestjs/common';

@Injectable()
export class SubjectService {


  findAll() {
    return `This action returns all verbs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verb`;
  }


  remove(id: number) {
    return `This action removes a #${id} verb`;
  }
}
