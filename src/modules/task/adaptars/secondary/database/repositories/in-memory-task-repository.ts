import { Injectable } from '@nestjs/common';
import { TaskRepository } from '@modules/task/core/application/ports/secondary/task-repository.interface';
import { Task, TaskStatus } from '@modules/task/core/domain/task.entity';
import { v4 } from 'uuid';
import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [
    {
      _id: v4(),
      title: 'Esse é um exemplo de tarefa',
      description: 'Não sei o que colocar aqui',
      status: 'concluída',
      expiresOn: new Date('2024-12-21T15:30:00+03:00'),
      createdAt: new Date('2024-12-21T14:10:34.749Z'),
      updatedAt: new Date('2024-12-21T14:10:34.749Z'),
    },
  ];

  async create(task: Task): Promise<Task> {
    task._id = v4();
    this.tasks.push(task);
    return task;
  }

  async findById(id: string): Promise<Task | undefined> {
    const task: Task | undefined = this.tasks.find((task) => task._id == id);

    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }

  async findByStatus(status: TaskStatus): Promise<Task[]> {
    const tasks = this.tasks.filter((task) => task.status == status);

    return tasks;
  }

  async update(id: string, newTask: TaskUpdate): Promise<Task> {
    const oldTask: Task | undefined = this.tasks.find((task) => task._id == id);
    const oldTaskIndex = this.tasks.indexOf(oldTask);

    this.tasks[oldTaskIndex] = { ...this.tasks[oldTaskIndex], ...newTask };
    return this.tasks[oldTaskIndex];
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((book) => book._id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    delete this.tasks[index];
  }
}
