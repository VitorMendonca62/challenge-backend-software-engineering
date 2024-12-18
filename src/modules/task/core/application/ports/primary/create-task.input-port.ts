import { CreateTaskDTO } from 'modules/task/adaptars/primary/rest/dto/create-task.dto';

export abstract class CreateTaskInputPort {
  abstract execute(body: CreateTaskDTO): Promise<undefined>;
}
