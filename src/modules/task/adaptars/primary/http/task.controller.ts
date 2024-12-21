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
import {
  EnumTaskStatus,
  TaskStatus,
} from 'modules/task/core/domain/task.entity';
import { CreateTaskDTO, ResponseCreateTask } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskUseCase } from 'modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from 'modules/task/core/application/use-cases/get-tasks.usecase';
import { TaskMapper } from '../../mapper/task.mapper';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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

  @ApiOperation({
    summary: 'Criar uma tarefa no banco de dados',
    parameters: null,
  })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
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

  @ApiOperation({
    summary: 'Listar todas as tarefas no banco de dados',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'A  tarefa é encontrada pelo status',
    enum: EnumTaskStatus,
  })
  @ApiResponse({ status: 200, description: 'Listagem de todas as tarefas' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Não encontrou tarefas' })
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

  @ApiOperation({
    summary: 'Listar apenas uma tarefa pelo id',
  })
  @ApiResponse({
    status: 200,
    description: 'Aqui está sua tarera encontrada pelo ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Encontrar tarefa pelo ID',
    example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
  })
  @ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getTaskUseCase.findById(id);
  }

  @ApiOperation({
    summary: 'Atualizar alguns campos de uma tarefa pelo ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'A tarefa é encontrada pelo ID',
    example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
  })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' })
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

  @ApiOperation({
    summary: 'Delete uma tarefa pelo ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'A tarefa é encontrada pelo ID',
    example: '72cfef2f-03ba-402e-93f7-71a74bf1fa08',
  })
  @ApiResponse({ status: 200, description: 'Tarefa deletada com sucesso' })
  @ApiResponse({ status: 404, description: 'Não encontrou a tarefa pelo ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }
}
