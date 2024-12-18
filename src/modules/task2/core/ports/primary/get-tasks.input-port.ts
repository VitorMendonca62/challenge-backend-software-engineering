import { Task, TaskStatus } from '../../domain/task.entity';

export abstract class GetTasksInputPort {
  abstract getByStatus(status: TaskStatus): Promise<Task[]>;
  abstract getAll(): Promise<Task[]>;
}
