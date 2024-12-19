import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<undefined>;
  abstract findById(id: string): Promise<Task | null>;
  abstract findAll(): Promise<Task[] | null>;
  abstract findByStatus(status: TaskStatus): Promise<Task[] | null>;
  abstract update(id: string, task: Task): Promise<undefined>;
  abstract delete(id: string): Promise<undefined>;
}
