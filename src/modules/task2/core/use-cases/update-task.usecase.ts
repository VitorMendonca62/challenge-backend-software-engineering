import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskRepository } from '../ports/secondary/task.repository';
import { UpdateTaskInputPort } from '../ports/primary/update-task.input-port';

@Injectable()
export class UpdateTaskCase implements UpdateTaskInputPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id, newTask): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    await this.taskRepository.update(id, newTask);

    return task;
  }
}
