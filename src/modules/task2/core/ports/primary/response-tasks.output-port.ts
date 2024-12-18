import { Task } from '../../domain/task.entity';

export interface ResponseTasksOutputPort {
  message: string;
  data: Task[] | Task | undefined;
}
