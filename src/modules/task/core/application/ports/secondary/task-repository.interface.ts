import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

export abstract class TaskRepository {
  abstract create(task: Task): Promise<Task>;
  abstract findById(id: string): Promise<Task | undefined>;
  abstract findAll(): Promise<Task[]>;
  abstract findByStatus(status: TaskStatus): Promise<Task[]>;
  abstract update(id: string, newTask: Task): Promise<Task>;
  abstract delete(id: string): Promise<void>;
}
