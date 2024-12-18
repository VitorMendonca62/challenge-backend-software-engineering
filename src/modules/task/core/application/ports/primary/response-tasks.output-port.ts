import { Task } from 'modules/task/core/domain/task.entity';

export interface ResponseTasksOutputPort {
  message: string;
  data: Task[] | Task | undefined;
}
