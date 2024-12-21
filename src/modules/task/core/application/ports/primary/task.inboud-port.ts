import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';

export abstract class CreateTaskInboundPort {
  abstract execute(task: Task): Promise<Task>;
}

export abstract class GetTaskInboundPort {
  abstract findById(id: string): Promise<Task>;
}

export abstract class GetTasksInboundPort {
  abstract findAll(): Promise<Task[]>;
  abstract findByStatus(status: TaskStatus): Promise<Task[]>;
}

export abstract class UpdateTaskInboundPort {
  abstract execute(id: string, newTask: Task): Promise<Task>;
}

export abstract class DeleteTaskInboundPort {
  abstract execute(id: string): Promise<void>;
}
