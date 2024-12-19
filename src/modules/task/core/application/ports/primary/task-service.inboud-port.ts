import {
  CreateTaskDTO,
  UpdateTaskDTO,
} from 'modules/task/adaptars/primary/rest/dto';
import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

export interface TaskServiceInboundPort {
  create(body: CreateTaskDTO): Promise<Task>;
  findAll(): Promise<Task[]>;
  findById(id: string): Promise<Task>;
  findByStatus(status: TaskStatus): Promise<Task[]>;
  update(id: string, newTask: UpdateTaskDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
