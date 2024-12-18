import { Task } from '../../domain/task.entity';

export abstract class GetTaskInputPort {
  abstract execute(id: string): Promise<Task>;
}
