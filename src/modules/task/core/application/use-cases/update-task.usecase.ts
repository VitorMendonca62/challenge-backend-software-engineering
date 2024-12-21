import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { UpdateTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable } from '@nestjs/common';
import { Task } from '../../domain/task.entity';
import { TaskUpdate } from '../../domain/task-update.entity';

@Injectable()
export class UpdateTaskUseCase implements UpdateTaskInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string, taskUpdate: TaskUpdate): Promise<Task> {
    const oldTask = await this.taskRepository.findById(id);

    const newTask = new Task({ ...oldTask, ...taskUpdate });

    return await this.taskRepository.update(id, newTask);
  }
}
