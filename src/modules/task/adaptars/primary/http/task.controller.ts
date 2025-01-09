import { Task, TaskStatus } from '@modules/task/core/domain/task.entity';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskMapper } from '../../mappers/task.mapper';
import { ApiTags } from '@nestjs/swagger';

// Use cases

import { CreateTaskUseCase } from '@modules/task/core/application/use-cases/create-task.usecase';
import { DeleteTaskUseCase } from '@modules/task/core/application/use-cases/delete-task.usecase';
import { UpdateTaskUseCase } from '@modules/task/core/application/use-cases/update-task.usecase';
import { GetTaskUseCase } from '@modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from '@modules/task/core/application/use-cases/get-tasks.usecase';

// Decorators
import {
  DeleteTaskSwagger,
  GetTaskSwagger,
  GetTasksSwagger,
  PostTaskSwagger,
  UpdateTaskSwagger,
} from './decorators/task-controller-decorators';

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
  BadRequestException,
} from '@nestjs/common';
import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';

abstract class ResponseController {
  abstract message: string;
  abstract data: Task | undefined;
}

@ApiTags('task')
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

  @PostTaskSwagger()
  @Post()
  async create(
    @Body() createTaskDTO: CreateTaskDTO,
  ): Promise<ResponseController> {
    const { title, description, expiresOn, status } = createTaskDTO;

    const task = await this.taskMapper.create({
      title,
      description,
      expiresOn,
      status,
    });

    return {
      data: await this.createTaskUseCase.execute(task),
      message: 'Tarefa criada com sucesso',
    };
  }

  @GetTasksSwagger()
  @Get()
  async findAll(@Query('status') status: TaskStatus | null) {
    if (status) {
      await this.taskMapper.findByStatus(status);
      return this.getTasksUseCase.findByStatus(status);
    }

    return {
      data: await this.getTasksUseCase.findAll(),
      message: 'Aqui está a listagem de todas as tarefas',
    };
  }

  @GetTaskSwagger()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getTaskUseCase.findById(id);
  }

  @UpdateTaskSwagger()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
    const { title, description, expiresOn, status } = updateTaskDTO;

    const newTask = await this.taskMapper.update(id, {
      title,
      description,
      expiresOn,
      status,
    });

    if (Object.keys(TaskUpdate.toJson(newTask)).length == 1) {
      throw new BadRequestException(
        'Adicione algum campo para realizar a modificação',
      );
    }

    return this.updateTaskUseCase.execute(id, newTask);
  }
  @DeleteTaskSwagger()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
