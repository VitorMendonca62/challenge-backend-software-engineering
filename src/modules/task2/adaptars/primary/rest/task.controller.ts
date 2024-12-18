import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskDTO, UpdateTaskDTO } from './dto';
import { CreateTaskInputPort } from 'src/modules/task2/core/ports/primary/create-task.input-port';
import { GetTaskInputPort } from 'src/modules/task2/core/ports/primary/get-task.input-port';
import { GetTasksInputPort } from 'src/modules/task2/core/ports/primary/get-tasks.input-port';
import { DeleteTaskInputPort } from 'src/modules/task2/core/ports/primary/delete-user.input-port';
import { UpdateTaskInputPort } from 'src/modules/task2/core/ports/primary/update-task.input-port';
import { TaskStatus } from 'src/modules/task2/core/domain/task.entity';

@Controller('task')
export class taskController {
  constructor(
    private createUserPort: CreateTaskInputPort,
    private getTaskInputPort: GetTaskInputPort,
    private getTasksInputPort: GetTasksInputPort,
    private deleteTaskInputPort: DeleteTaskInputPort,
    private updateTaskInputPort: UpdateTaskInputPort,
  ) {}

  @Post()
  create(@Body() body: CreateTaskDTO) {
    try {
      return this.createUserPort.execute(body);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Get()
  findAll() {
    try {
      return this.getTasksInputPort.getAll();
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.getTaskInputPort.execute(id);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  filterByStatus(@Param('status') status: TaskStatus) {
    try {
      return this.getTaskInputPort.execute(status);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() newTask: UpdateTaskDTO) {
    try {
      return this.updateTaskInputPort.execute(id, newTask);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.deleteTaskInputPort.execute(id);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }
}
