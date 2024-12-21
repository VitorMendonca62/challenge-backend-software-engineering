import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateTaskUseCase } from 'modules/task/core/application/use-cases/create-task.usecase';
import { DeleteTaskUseCase } from 'modules/task/core/application/use-cases/delete-task.usecase';
import { UpdateTaskUseCase } from 'modules/task/core/application/use-cases/update-task.usecase';
import { TaskStatus } from 'modules/task/core/domain/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskUseCase } from 'modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from 'modules/task/core/application/use-cases/get-tasks.usecase';
import { TaskMapper } from '../../mapper/task.mapper';

@Controller('task')
@UsePipes(new ValidationPipe())
export class TaskController {
  constructor(
    private readonly taskMapper: TaskMapper,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly getTaskUseCase: GetTaskUseCase,
    private readonly getTasksUseCase: GetTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
  ) {}

  @Post()
  async create(@Body() createTaskDTO: CreateTaskDTO) {
    const { title, description, expiresOn, status } = createTaskDTO;

    const task = await this.taskMapper.create({
      title,
      description,
      expiresOn,
      status,
    });

    return this.createTaskUseCase.execute(task);
  }

  @Get()
  async findAll(@Query('status') status?: TaskStatus) {
    if (status) {
      await this.taskMapper.findByStatus(status);
      return this.getTasksUseCase.findByStatus(status);
    }

    return this.getTasksUseCase.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getTaskUseCase.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
    const { title, description, expiresOn, status } = updateTaskDTO;

    const newTask = await this.taskMapper.update(id, {
      title,
      description,
      expiresOn,
      status,
    });

    return this.updateTaskUseCase.execute(id, newTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
