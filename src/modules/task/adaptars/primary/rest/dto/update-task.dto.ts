import { TaskStatus } from '../../../../core/domain/task.entity';

export interface UpdateTaskDTO {
  title: string;
  description?: string;
  status: TaskStatus;
  expiresOn?: Date;
}
