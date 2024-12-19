import {
  CreateTaskDTO,
  UpdateTaskDTO,
} from 'modules/task/adaptars/primary/rest/dto';
import { TaskServiceInboundPort } from '../ports/primary/task-service.inboud-port';
import { EnumTaskStatus, Task, TaskStatus } from '../../domain/task.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TaskService implements TaskServiceInboundPort {
  constructor(private taskRepository: TaskRepository) {}

  async create(body: CreateTaskDTO): Promise<Task> {
    const id = randomUUID();
    const createdAt = new Date();
    const updatedAt = new Date();
    const status = EnumTaskStatus.Pending;
    // Criar uma Mappper para validação de dados
    const task = new Task({ ...body, id, createdAt, updatedAt, status });

    // Fazer a conexão entre service e banco de dados
    this.taskRepository.create(task);

    return task;
  }
  async findAll(): Promise<Task[]> {
    const tasks = await this.taskRepository.findAll();

    if (tasks === null) {
      throw new NotFoundException(
        'Não foi possivel encontrar alguma tarefa. Crie uma!',
      );
    }

    return tasks;
  }
  async findById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    return task;
  }

  async findByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = await this.taskRepository.findByStatus(status);

    if (tasks === null) {
      throw new NotFoundException(
        'Não foi possivel encontrar tarefas nesse filtro',
      );
    }

    return tasks;
  }
  async update(id: string, newTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    const newTask = { ...task, ...newTaskDTO };

    await this.taskRepository.update(id, newTask);

    return task;
  }

  async delete(id: string): Promise<undefined> {
    const task = await this.taskRepository.findById(id);

    if (task === null) {
      throw new NotFoundException('Não foi possivel encontrar a tarefa');
    }

    await this.taskRepository.delete(id);
  }
}
