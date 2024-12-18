import { Task } from 'modules/task/core/domain/task.entity';

export abstract class GetTaskInputPort {
  abstract execute(id: string): Promise<Task>;
}
