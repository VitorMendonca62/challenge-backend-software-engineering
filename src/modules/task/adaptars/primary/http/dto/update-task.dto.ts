import { TaskStatus } from '../../../../core/domain/task.entity';
import { Title } from '../decorators/title.decorator';
import { Description } from '../decorators/description.decorator';
import { ExpiresOn } from '../decorators/expiresOn.decorator';
import { Status } from '../decorators/status.decorator';

export class UpdateTaskDTO {
  @Title(false)
  title?: string;

  @Description()
  description?: string;

  @ExpiresOn()
  expiresOn?: Date;

  @Status(false)
  status: TaskStatus;
}
