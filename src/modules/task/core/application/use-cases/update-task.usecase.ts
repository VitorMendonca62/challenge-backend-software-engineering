import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { UpdateTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/task.entity';

@Injectable()
export class UpdateTaskUseCase implements UpdateTaskInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, newTaskDTO: Task): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    const newTask = { ...task, ...newTaskDTO };

    await this.taskRepository.update(id, newTask);

    return newTask;
  }
}
