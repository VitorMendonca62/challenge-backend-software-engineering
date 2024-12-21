import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'modules/task/core/application/ports/secondary/task-repository.interface';
import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    {
      id: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
      title: 'Esse é um exemplo de tarefa',
      description: 'Não sei o que colocar aqui',
      status: 'concluída',
      expiresOn: new Date('2024-12-21T15:30:00+03:00'),
      createdAt: new Date('2024-12-21T14:10:34.749Z'),
      updatedAt: new Date('2024-12-21T14:10:34.749Z'),
    },
  ];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findById(id: string): Promise<Task | undefined> {
    const task: Task | undefined = this.tasks.find((task) => task.id == id);

    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.status == status);

    return tasks;
  }

  async update(id: string, newTask: Task): Promise<Task> {
    const oldTask: Task | undefined = this.tasks.find((task) => task.id == id);
    const oldTaskIndex = this.tasks.indexOf(oldTask);

    this.tasks[oldTaskIndex] = newTask;
    return newTask;
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    delete this.tasks[index];
  }
}
