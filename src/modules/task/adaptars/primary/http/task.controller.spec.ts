/* eslint-disable @typescript-eslint/no-unused-vars */
import { TaskController } from './task.controller';
import { CreateTaskUseCase } from '@modules/task/core/application/use-cases/create-task.usecase';
import { DeleteTaskUseCase } from '@modules/task/core/application/use-cases/delete-task.usecase';
import { GetTaskUseCase } from '@modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from '@modules/task/core/application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from '@modules/task/core/application/use-cases/update-task.usecase';
import { TaskMapper } from '../../mappers/task.mapper';
import { Task, TaskStatus } from '@modules/task/core/domain/task.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '@modules/task/core/application/ports/secondary/task-repository.interface';
import { InMemoryTaskRepository } from '../../secondary/database/repositories/in-memory-task-repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';

describe('TaskController', () => {
  let app: INestApplication;

  let taskController: TaskController;

  let createTaskUseCase: CreateTaskUseCase;
  let getTaskUseCase: GetTaskUseCase;
  let getTasksUseCase: GetTasksUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;

  let taskMapper: TaskMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        GetTaskUseCase,
        GetTasksUseCase,
        UpdateTaskUseCase,
        CreateTaskUseCase,
        DeleteTaskUseCase,
        TaskMapper,
        {
          provide: TaskRepository,
          useClass: InMemoryTaskRepository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
    await app.init();

    taskController = module.get<TaskController>(TaskController);

    getTaskUseCase = module.get<GetTaskUseCase>(GetTaskUseCase);
    getTasksUseCase = module.get<GetTasksUseCase>(GetTasksUseCase);
    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);

    taskMapper = module.get<TaskMapper>(TaskMapper);
  });

  afterEach(() => {
    app.close();
  });

  const mockCreateTask = (overrides = {}): CreateTaskDTO => ({
    title: 'Default Title',
    status: 'pendente' as TaskStatus,
    ...overrides,
  });

  const mockListTask = () => {
    const task01 = mockTask({ title: 'Task01' });
    const task02 = mockTask({ title: 'Task02', status: 'concluída' });
    const task03 = mockTask({ title: 'Task03', status: 'realizando' });
    const task04 = mockTask({ title: 'Task04' });

    return [task01, task02, task03, task04];
  };

  const mockTask = (overrides: CreateTaskDTO | object = {}) =>
    new Task({
      ...mockCreateTask({ ...overrides }),
      createdAt: new Date('Tue Jan 14 2025 11:38:38'),
      updatedAt: new Date('Tue Jan 14 2025 11:38:38'),
    });

  describe('POST /', () => {
    beforeEach(() => {
      jest
        .spyOn(createTaskUseCase, 'execute')
        .mockImplementation(async (task) => task);
      jest
        .spyOn(taskMapper, 'create')
        .mockImplementation(async (dto) => mockTask(dto));
    });

    it('should use case call with correct parameters', async () => {
      const createTaskDTO = mockCreateTask({ title: 'Task 01' });

      await taskController.create(createTaskDTO);

      expect(taskMapper.create).toHaveBeenCalledWith(createTaskDTO);
      expect(createTaskUseCase.execute).toHaveBeenCalledWith(expect.any(Task));
    });

    it('should create task without optional fields and return the task', async () => {
      const createTaskDTO = mockCreateTask({ title: 'Task 02' });

      const response = await taskController.create(createTaskDTO);

      expect(response).toEqual({
        data: mockTask(createTaskDTO),
        message: 'Tarefa criada com sucesso',
      });
    });

    it('should create task with optional fields and return the task', async () => {
      const createTaskDTO = mockCreateTask({
        title: 'Task 03',
        description: 'Teste 03',
        expiresOn: new Date(),
      });

      const response = await taskController.create(createTaskDTO);

      expect(response).toEqual({
        data: mockTask(createTaskDTO),
        message: 'Tarefa criada com sucesso',
      });
    });

    it('should throw a bad request error with undefined fields ', async () => {
      const createTaskDTO = { title: undefined, status: undefined };

      const response = await request(app.getHttpServer())
        .post('/task')
        .send(createTaskDTO);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: [
          'O titulo é um campo obrigatório',
          'O status é um campo obrigatório',
        ],
        statusCode: 400,
      });
    });

    it('should throw a bad request error with invalid status ', async () => {
      const createTaskDTO = { title: 'Task 04', status: 'invalid-status' };

      const response = await request(app.getHttpServer())
        .post('/task')
        .send(createTaskDTO);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: ['O status está inválido, escolha outro válido'],
        statusCode: 400,
      });
    });
  });

  describe('GET /', () => {
    beforeEach(() => {
      const task = mockTask();

      jest
        .spyOn(getTasksUseCase, 'findAll')
        .mockImplementation(async () => [task, task]);
    });

    it('should use case call', async () => {
      await taskController.findAll();

      expect(getTasksUseCase.findAll).toHaveBeenCalled();
    });

    it('should return two tasks', async () => {
      const response = await taskController.findAll();

      const task = mockTask();

      expect(response.data).toHaveLength(2);
      expect(response).toEqual({
        data: [task, task],
        message: 'Aqui está a listagem de todas as tarefas',
      });
    });

    it('should throw not found error', async () => {
      jest
        .spyOn(getTasksUseCase, 'findAll')
        .mockRejectedValue(
          new NotFoundException(
            'Não foi possivel encontrar alguma tarefa. Crie uma!',
          ),
        );

      await expect(taskController.findAll()).rejects.toThrow(
        'Não foi possivel encontrar alguma tarefa. Crie uma!',
      );
    });
  });

  describe('GET /?status=', () => {
    beforeEach(() => {
      jest
        .spyOn(getTasksUseCase, 'findByStatus')
        .mockImplementation(async () => mockListTask());
    });

    it('should use case call', async () => {
      await taskController.findAll('concluída');

      expect(getTasksUseCase.findByStatus).toHaveBeenCalled();
    });

    it('should return all filtered tasks', async () => {
      const tasks = mockListTask();
      jest
        .spyOn(getTasksUseCase, 'findByStatus')
        .mockResolvedValue([tasks[0], tasks[3]]);

      const response = await taskController.findAll('pendente');

      expect(response.data).toHaveLength(2);
      expect(response).toEqual({
        data: [tasks[0], tasks[3]],
        message:
          'Aqui está a listagem de todas as tarefas filtradas por status',
      });
    });

    it('should throw not found error', async () => {
      jest
        .spyOn(getTasksUseCase, 'findByStatus')
        .mockRejectedValue(
          new NotFoundException(
            'Não foi possivel encontrar tarefas nesse filtro',
          ),
        );

      await expect(taskController.findAll('pendente')).rejects.toThrow(
        'Não foi possivel encontrar tarefas nesse filtro',
      );
    });
  });
});
