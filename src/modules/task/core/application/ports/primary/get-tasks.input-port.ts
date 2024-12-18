import { TaskStatus, Task } from 'modules/task/core/domain/task.entity';

export abstract class GetTasksInputPort {
  abstract getByStatus(status: TaskStatus): Promise<Task[]>;
  abstract getAll(): Promise<Task[]>;
}
