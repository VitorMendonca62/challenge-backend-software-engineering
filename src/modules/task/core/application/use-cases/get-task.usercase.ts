import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskInputPort } from '../ports/primary/get-task.input-port';
import { TaskRepository } from '../ports/secondary/task.repository';
import { Task } from '../../domain/task.entity';

@Injectable()
export class GetTaskUseCase implements GetTaskInputPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    return task;
  }
}
