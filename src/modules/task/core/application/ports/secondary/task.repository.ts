import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

export interface TaskRepository {
  create(task: Task): Promise<undefined>;
  findById(id: string): Promise<Task | null>;
  findByTi(id: string): Promise<Task | null>;
  findAll(): Promise<Task[] | null>;
  findByStatus(status: TaskStatus): Promise<Task[] | null>;
  update(id: string, task: Task): Promise<undefined>;
  delete(id: string): Promise<undefined>;
}
