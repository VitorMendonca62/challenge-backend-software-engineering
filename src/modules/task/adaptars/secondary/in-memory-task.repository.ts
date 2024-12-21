import { Injectable } from '@nestjs/common';
import { TaskRepository } from 'modules/task/core/application/ports/secondary/task-repository.interface';
import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

@Injectable()
export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

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

    this.tasks[oldTaskIndex] = { ...oldTask, ...newTask };
    return this.tasks[oldTaskIndex];
  }

  async delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((book) => book.id === id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
    delete this.tasks[index];
  }
}
