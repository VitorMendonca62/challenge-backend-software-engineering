import { CreateTaskDTO } from 'src/modules/task2/adaptars/primary/rest/dto';

export abstract class CreateTaskInputPort {
  abstract execute(body: CreateTaskDTO): Promise<undefined>;
}
