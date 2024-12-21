import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { Task } from '../../domain/task.entity';
import { CreateTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskUseCase implements CreateTaskInboundPort {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<Task> {
    return this.taskRepository.create(task);
  }
}
