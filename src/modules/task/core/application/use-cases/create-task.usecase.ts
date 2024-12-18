import { Injectable } from '@nestjs/common';
import { CreateTaskInputPort } from '../ports/primary/create-task.input-port';
import { TaskRepository } from '../ports/secondary/task.repository';
import { randomUUID } from 'crypto';
import { Task } from '../../domain/task.entity';
import { CreateTaskDTO } from 'modules/task/adaptars/primary/rest/dto';

@Injectable()
export class CreateTaskUseCase implements CreateTaskInputPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(body: CreateTaskDTO): Promise<undefined> {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();

    const task = new Task({ ...body, id, createdAt, updatedAt });

    this.taskRepository.create(task);
  }
}
