import { Module } from '@nestjs/common';
import { TaskService } from './core/application/services/task.service';

@Module({
  providers: [TaskService],
})
export class TaskModule {}
