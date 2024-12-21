import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';
import { Title } from '../decorators/title.decorator';
import { Description } from '../decorators/description.decorator';
import { ExpiresOn } from '../decorators/expiresOn.decorator';
import { Status } from '../decorators/status.decorator';

export class CreateTaskDTO {
  @Title(true)
  title: string;

  @Description()
  description?: string;

  @ExpiresOn()
  expiresOn?: Date;

  @Status(true)
  status: TaskStatus;
}

export class ResponseCreateTask {
  message: string;
  data: Task;
}
