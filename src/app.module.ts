import { Module } from '@nestjs/common';
import { TaskModule } from './modules/task/task.module';
import { Task2Module } from './task2/task2.module';
import { Task2Module } from './modules/task2/task2.module';

@Module({
  imports: [TaskModule, Task2Module],
})
export class AppModule {}

