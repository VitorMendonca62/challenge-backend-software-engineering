import { CreateTaskDTO } from '../primary/http/dto/create-task.dto';
import { isEnum } from 'class-validator';
import { UpdateTaskDTO } from '../primary/http/dto/update-task.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EnumTaskStatus,
  Task,
  TaskStatus,
} from '@modules/task/core/domain/task.entity';
import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';

@Injectable()
export class TaskMapper {
  async findByStatus(status: TaskStatus): Promise<void> {
    if (!isEnum(status, EnumTaskStatus)) {
      throw new BadRequestException(
        'O status está inválido, escolha outro válido',
      );
    }
  }

  async create(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const createdAt = new Date();
    const updatedAt = new Date();

    const task = new Task({
      ...createTaskDTO,
      createdAt,
      updatedAt,
    });

    return task;
  }

  async update(updateTaskDTO: UpdateTaskDTO): Promise<TaskUpdate> {
    const updatedAt = new Date();
    const expiresOn = new Date(updateTaskDTO.expiresOn);

    const task = new TaskUpdate({
      ...updateTaskDTO,
      expiresOn,
      updatedAt,
    });

    return task;
  }
}
