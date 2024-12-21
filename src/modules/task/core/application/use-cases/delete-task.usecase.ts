import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { DeleteTaskInboundPort } from '../ports/primary/task.inboud-port';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTaskUseCase implements DeleteTaskInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<undefined> {
    const task = await this.taskRepository.findById(id);

    if (task === undefined) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    await this.taskRepository.delete(id);
  }
}
