import { UpdateTaskDTO } from 'modules/task/adaptars/primary/rest/dto';
import { Task } from 'modules/task/core/domain/task.entity';

export abstract class UpdateTaskInputPort {
  abstract execute(id: string, newTask: UpdateTaskDTO): Promise<Task>;
}
