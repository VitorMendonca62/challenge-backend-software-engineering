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
import { TaskStatus } from 'modules/task/core/domain/task.entity';
import { TaskService } from 'modules/task/core/application/services/task.service';

@Controller('task')
export class taskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() body: CreateTaskDTO) {
    try {
      return this.taskService.create(body);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Get()
  findAll() {
    try {
      return this.taskService.findAll();
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.taskService.findById(id);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  filterByStatus(@Param('status') status: TaskStatus) {
    try {
      return this.taskService.findByStatus(status);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() newTask: UpdateTaskDTO) {
    try {
      return this.taskService.update(id, newTask);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.taskService.delete(id);
    } catch (err: any) {
      return { message: err.message, data: undefined };
    }
  }
}
