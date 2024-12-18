import { UpdateTaskDTO } from 'src/modules/task2/adaptars/primary/rest/dto';
import { Task } from '../../domain/task.entity';

export abstract class UpdateTaskInputPort {
  abstract execute(id: string, newTask: UpdateTaskDTO): Promise<Task>;
}
