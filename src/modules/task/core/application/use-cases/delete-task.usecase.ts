import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../ports/secondary/task.repository';
import { DeleteTaskInputPort } from '../ports/primary/delete-user.input-port';

@Injectable()
export class DeleteTaskUseCase implements DeleteTaskInputPort {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: string): Promise<undefined> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    await this.taskRepository.delete(id);
  }
}
