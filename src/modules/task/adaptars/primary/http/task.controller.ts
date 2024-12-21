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
import { CreateTaskDTO, ResponseCreateTask } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskUseCase } from 'modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from 'modules/task/core/application/use-cases/get-tasks.usecase';
import { TaskMapper } from '../../mapper/task.mapper';
import { ApiTags } from '@nestjs/swagger';
import { PostTaskSwagger } from './decorators/post-task-swagger.decorator';
import { GetTasksSwagger } from './decorators/get-tasks-swagger.decorator';
import { GetTaskSwagger } from './decorators/get-task-swagger.decorator';
import { UpdateTaskSwagger } from './decorators/update-task-swagger.decorator';
import { DeleteTaskSwagger } from './decorators/delete-task-swagger.decorator';

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
  ): Promise<ResponseCreateTask> {
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

    return this.updateTaskUseCase.execute(id, newTask);
  }
  @DeleteTaskSwagger()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
