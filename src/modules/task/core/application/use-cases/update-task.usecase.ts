import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { UpdateTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../../domain/task.entity';
import { TaskUpdate } from '../../domain/task-update.entity';

@Injectable()
export class UpdateTaskUseCase implements UpdateTaskInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, taskUpdate: TaskUpdate): Promise<Task> {
    const oldTask = await this.taskRepository.findById(id);

    if (oldTask === undefined) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    return await this.taskRepository.update(id, taskUpdate);
  }
}
