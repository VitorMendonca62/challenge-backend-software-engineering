import { Injectable } from '@nestjs/common';
import { CreatetaskDto } from './domain/dtos/create-task.dto';
import { UpdatetaskDto } from './domain/dtos/update-task.dto';

@Injectable()
export class taskService {
  create(createtaskDto: CreatetaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updatetaskDto: UpdatetaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
