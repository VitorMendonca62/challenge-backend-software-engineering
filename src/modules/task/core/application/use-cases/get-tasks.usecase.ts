import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { GetTasksInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '../../domain/task.entity';

@Injectable()
export class GetTasksUseCase implements GetTasksInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();

    if (tasks.length == 0) {
      throw new NotFoundException(
        'Não foi possivel encontrar alguma tarefa. Crie uma!',
      );
    }

    return tasks;
  }

  async findByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = await this.taskRepository.findByStatus(status);

    if (tasks.length == 0) {
      throw new NotFoundException(
        'Não foi possivel encontrar tarefas nesse filtro',
      );
    }

    return tasks;
  }
}
