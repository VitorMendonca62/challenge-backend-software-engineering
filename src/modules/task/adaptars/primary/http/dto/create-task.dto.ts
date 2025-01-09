import { TaskStatus } from '@modules/task/core/domain/task.entity';
import { Title } from '../decorators/title.decorator';
import { Description } from '../decorators/description.decorator';
import { ExpiresOn } from '../decorators/expires-on.decorator';
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
