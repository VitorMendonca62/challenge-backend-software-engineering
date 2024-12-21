import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { GetTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../../domain/task.entity';

@Injectable()
export class GetTaskUseCase implements GetTaskInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (task === undefined) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    return task;
  }
}
