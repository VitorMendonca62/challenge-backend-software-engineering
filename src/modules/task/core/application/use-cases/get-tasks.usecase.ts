import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../ports/secondary/task.repository';
import { GetTasksInputPort } from '../ports/primary/get-tasks.input-port';
import { TaskStatus, Task } from '../../domain/task.entity';

@Injectable()
export class GetTasksUseCase implements GetTasksInputPort {
  constructor(private taskRepository: TaskRepository) {}
  async getByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = await this.taskRepository.findByStatus(status);

    if (tasks === null) {
      throw new NotFoundException(
        'Não foi possivel encontrar tarefas nesse filtro',
      );
    }

    return tasks;
  }
  async getAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();

    if (tasks === null) {
      throw new NotFoundException(
        'Não foi possivel encontrar alguma tarefa. Crie uma!',
      );
    }

    return tasks;
  }
}
