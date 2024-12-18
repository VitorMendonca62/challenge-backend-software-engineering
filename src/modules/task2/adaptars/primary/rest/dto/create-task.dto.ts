import { TaskStatus } from '../../../../core/domain/task.entity';

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status: TaskStatus;
  expiresOn?: Date;
}
