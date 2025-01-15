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
import { ValidationStatusPipe } from './pipes/validation-status.pipe';
import { ValidationExpiresOnPipe } from './pipes/validation-expireson.pipe';

interface ResponseController {
  message: string;
  data: Task | Task[] | undefined;
}

@ApiTags('task')
@Controller('task')
@UsePipes(new ValidationPipe({ stopAtFirstError: true }))
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
  @UsePipes(new ValidationExpiresOnPipe())
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
  @UsePipes(new ValidationStatusPipe())
  async findAll(
    @Query('status') status?: TaskStatus,
  ): Promise<ResponseController> {
    if (status) {
      return {
        data: await this.getTasksUseCase.findByStatus(status),
        message:
          'Aqui está a listagem de todas as tarefas filtradas por status',
      };
    }

    return {
      data: await this.getTasksUseCase.findAll(),
      message: 'Aqui está a listagem de todas as tarefas',
    };
  }

  @GetTaskSwagger()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseController> {
    return {
      data: await this.getTaskUseCase.findById(id),
      message: 'Aqui está a tarefa filtrada pelo ID',
    };
  }

  @UpdateTaskSwagger()
  @Patch(':id')
  @UsePipes(new ValidationExpiresOnPipe())
  async update(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
  ): Promise<ResponseController> {
    const { title, description, expiresOn, status } = updateTaskDTO;

    const newTask = await this.taskMapper.update({
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

    return {
      data: await this.updateTaskUseCase.execute(id, newTask),
      message: 'Tarefa atualizada com sucesso!',
    };
  }

  @DeleteTaskSwagger()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseController> {
    return {
      message: 'Tarefa deletada com sucesso!',
      data: await this.deleteTaskUseCase.execute(id),
    };
  }
}
