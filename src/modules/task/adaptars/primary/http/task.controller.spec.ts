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
import { CreateTaskDTO } from './dto/create-task.dto';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryForEnvironment } from '../../secondary/database/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';
import { UpdateTaskDTO } from './dto/update-task.dto';

describe('TaskController', () => {
  let app: INestApplication;

  let taskController: TaskController;

  let createTaskUseCase: CreateTaskUseCase;
  let getTaskUseCase: GetTaskUseCase;
  let getTasksUseCase: GetTasksUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let deleteTaskUseCase: DeleteTaskUseCase;

  let taskMapper: TaskMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
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
          useFactory: () => getRepositoryForEnvironment(true),
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
      ...mockCreateTask(overrides),
      createdAt: new Date('Tue Jan 14 2025 11:38:38'),
      updatedAt: new Date('Tue Jan 14 2025 11:38:38'),
    });

  const mockUpdateTask = (overrides: UpdateTaskDTO | object = {}) => {
    if ((overrides as UpdateTaskDTO).expiresOn)
      (overrides as UpdateTaskDTO).expiresOn = new Date(
        (overrides as UpdateTaskDTO).expiresOn,
      );

    return new TaskUpdate({
      ...mockCreateTask(overrides),
      updatedAt: new Date('Tue Jan 14 2025 11:38:38'),
    });
  };

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

    it('should bad request when expiresOn is latest than current date', async () => {
      const createTaskDTO = mockCreateTask({
        expiresOn: '2000-12-21T18:30:00.000Z',
      });

      const response = await request(app.getHttpServer())
        .post('/task')
        .send(createTaskDTO);

      expect(response.body).toEqual({
        error: 'Bad Request',
        message: 'A data de vencimento deve ser maior que a data atual',
        statusCode: 400,
      });
    });
  });

  describe('GET /', () => {
    beforeEach(() => {
      jest
        .spyOn(getTasksUseCase, 'findAll')
        .mockImplementation(async () => mockListTask());
    });

    it('should use case call', async () => {
      await taskController.findAll();

      expect(getTasksUseCase.findAll).toHaveBeenCalled();
    });

    it('should return two tasks', async () => {
      const response = await taskController.findAll();

      expect(response.data).toHaveLength(4);
      expect(response).toEqual({
        data: mockListTask(),
        message: 'Aqui está a listagem de todas as tarefas',
      });
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
        .mockImplementation(async () => [tasks[0], tasks[3]]);

      const response = await taskController.findAll('pendente');

      expect(response.data).toHaveLength(2);
      expect(response).toEqual({
        data: [tasks[0], tasks[3]],
        message:
          'Aqui está a listagem de todas as tarefas filtradas por status',
      });
    });

    it('should throw bad request error with invalid status', async () => {
      const response = await request(app.getHttpServer())
        .get('/task?status=invalid-status')
        .expect(400);

      expect(response.body).toEqual({
        message: 'O status está inválido, escolha outro válido',
        error: 'Bad Request',
        statusCode: 400,
      });
    });
  });

  describe('GET /:id', () => {
    beforeEach(() => {
      jest.spyOn(getTaskUseCase, 'findById').mockImplementation(async (id) =>
        mockTask({
          title: 'Task 01',
          _id: id,
        }),
      );
    });

    it('should use case call', async () => {
      await taskController.findOne('IDTASK');

      expect(getTaskUseCase.findById).toHaveBeenCalled();
    });

    it('should return filtered task', async () => {
      const response = await taskController.findOne('IDTASK');

      const task = mockTask({
        title: 'Task 01',
        _id: 'IDTASK',
      });

      expect(response).toEqual({
        data: task,
        message: 'Aqui está a tarefa filtrada pelo ID',
      });
    });
  });

  describe('PATCH /:id', () => {
    beforeEach(() => {
      jest
        .spyOn(updateTaskUseCase, 'execute')
        .mockImplementation(async (id, updateTaskDTO) =>
          mockTask({
            _id: id,
            title: 'Task 01',
            ...updateTaskDTO,
          }),
        );

      jest
        .spyOn(taskMapper, 'update')
        .mockImplementation(async (dto) => mockUpdateTask(dto));
    });

    it('should use case call with correct parameters', async () => {
      const updateTaskDTO = {
        title: 'Task 01',
        description: undefined,
        expiresOn: undefined,
        status: undefined,
      };

      await taskController.update('TASKID', updateTaskDTO);

      expect(taskMapper.update).toHaveBeenCalledWith(updateTaskDTO);
      expect(updateTaskUseCase.execute).toHaveBeenCalledWith(
        'TASKID',
        expect.any(TaskUpdate),
      );
    });

    it('should update task without optional fields and return the task', async () => {
      const updateTaskDTO = {
        title: 'Task 02',
        status: 'realizando' as TaskStatus,
        description: undefined,
        expiresOn: undefined,
      };

      const response = await taskController.update('TASKID', updateTaskDTO);

      expect(response).toEqual({
        data: mockTask(updateTaskDTO),
        message: 'Tarefa atualizada com sucesso!',
      });
    });

    it('should update task with optional fields and return the task', async () => {
      const updateDTO = {
        title: 'Task 02',
        status: 'realizando' as TaskStatus,
        description: 'teste',
        expiresOn: new Date('2024-12-21T18:30:00.000Z'),
      };

      const response = await taskController.update('TASKID', updateDTO);

      expect(response).toEqual({
        data: mockTask({
          ...updateDTO,
          expiresOn: new Date(updateDTO.expiresOn),
        }),
        message: 'Tarefa atualizada com sucesso!',
      });
    });

    it('should bad request when no having fields', async () => {
      const updateDTO = {};

      await expect(taskController.update('TASKID', updateDTO)).rejects.toThrow(
        'Adicione algum campo para realizar a modificação',
      );
    });

    it('should bad request when expiresOn is latest than current date', async () => {
      const updateTaskDTO = { expiresOn: '2000-12-21T18:30:00.000Z' };

      const response = await request(app.getHttpServer())
        .patch('/task/TASKID')
        .send(updateTaskDTO);

      expect(response.body).toEqual({
        error: 'Bad Request',
        message: 'A data de vencimento deve ser maior que a data atual',
        statusCode: 400,
      });
    });
  });
});
