import { Module } from '@nestjs/common';
import { TaskController } from './adaptars/primary/http/task.controller';
import { GetTaskUseCase } from './core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from './core/application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from './core/application/use-cases/update-task.usecase';
import { CreateTaskUseCase } from './core/application/use-cases/create-task.usecase';
import { DeleteTaskUseCase } from './core/application/use-cases/delete-task.usecase';
import { TaskRepository } from './core/application/ports/secondary/task-repository.interface';
import { TaskMapper } from './adaptars/mappers/task.mapper';
import { DatabaseModule } from '@modules/database/database.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MongooseTaskRepository } from './adaptars/secondary/database/repositories/mongoose-taks-repository';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InMemoryTaskRepository } from './adaptars/secondary/database/repositories/in-memory-task-repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TaskController],
  providers: [
    GetTaskUseCase,
    GetTasksUseCase,
    UpdateTaskUseCase,
    CreateTaskUseCase,
    DeleteTaskUseCase,
    TaskMapper,
    {
      provide: TaskRepository,
      useClass: MongooseTaskRepository,
    },
  ],
})
export class TaskModule {}
