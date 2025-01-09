import { TaskController } from './task.controller';
import { TaskRepository } from '@modules/task/core/application/ports/secondary/task-repository.interface';
import { CreateTaskUseCase } from '@modules/task/core/application/use-cases/create-task.usecase';
import { DeleteTaskUseCase } from '@modules/task/core/application/use-cases/delete-task.usecase';
import { GetTaskUseCase } from '@modules/task/core/application/use-cases/get-task.usecase';
import { GetTasksUseCase } from '@modules/task/core/application/use-cases/get-tasks.usecase';
import { UpdateTaskUseCase } from '@modules/task/core/application/use-cases/update-task.usecase';
import { TaskMapper } from '../../mappers/task.mapper';
import { Task, TaskStatus } from '@modules/task/core/domain/task.entity';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskRepository: TaskRepository;

  let createTaskUseCase: CreateTaskUseCase;
  let getTaskUseCase: GetTaskUseCase;
  let getTasksUseCase: GetTasksUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;

  let taskMapper: TaskMapper;

  beforeEach(async () => {
    taskRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByStatus: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    taskMapper = new TaskMapper();

    createTaskUseCase = new CreateTaskUseCase(taskRepository);
    getTaskUseCase = new GetTaskUseCase(taskRepository);
    getTasksUseCase = new GetTasksUseCase(taskRepository);
    updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

    taskController = new TaskController(
      taskMapper,
      createTaskUseCase,
      getTaskUseCase,
      getTasksUseCase,
      updateTaskUseCase,
      deleteTaskUseCase,
    );
  });

  describe('POST /', () => {
    it('should create task without optional fields and return the task', async () => {
      const createTaskDTO = {
        title: 'Task 01',
        status: 'pendente' as TaskStatus,
      };

      const mapperResult = new Task({
        ...createTaskDTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(taskMapper, 'create').mockResolvedValue(mapperResult);
      jest.spyOn(createTaskUseCase, 'execute').mockResolvedValue(mapperResult);

      const response = await taskController.create(createTaskDTO);

      expect(response.data).toBe(mapperResult);
    });

    it('should create task with optional fields and return the task', async () => {
      const createTaskDTO = {
        title: 'Task 02',
        description: 'Teste 02',
        expiresOn: new Date(),
        status: 'concluída' as TaskStatus,
      };

      const mapperResult = new Task({
        ...createTaskDTO,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      jest.spyOn(taskMapper, 'create').mockResolvedValue(mapperResult);
      jest.spyOn(createTaskUseCase, 'execute').mockResolvedValue(mapperResult);

      const response = await taskController.create(createTaskDTO);

      expect(response.data).toBe(mapperResult);
    });
  });
});
