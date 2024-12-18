import { Module } from '@nestjs/common';
import { taskService } from './task.service';

@Module({
  providers: [taskService],
})
export class taskModule {}
