import { getRepositoryForEnvironment } from '@modules/task/adaptars/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { mockListTask } from '@modules/task/utils/test-helpers.util';
import { GetTasksUseCase } from './get-tasks.usecase';

describe('GetTasksUseCase', () => {
  let getTasksUseCase: GetTasksUseCase;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        GetTasksUseCase,
        {
          provide: TaskRepository,
          useFactory: () => getRepositoryForEnvironment(true),
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);

    getTasksUseCase = module.get<GetTasksUseCase>(GetTasksUseCase);
  });

  it('should be defined', () => {
    expect(getTasksUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(() => {
      jest
        .spyOn(taskRepository, 'findAll')
        .mockImplementation(async () => mockListTask());
    });

    it('should call repository with parameters', () => {
      getTasksUseCase.findAll();
      expect(taskRepository.findAll).toHaveBeenCalled();
    });

    it('should return all tasks', async () => {
      const response = await getTasksUseCase.findAll();

      expect(response).toEqual(mockListTask());
    });

    it('should throw not found error', async () => {
      jest.spyOn(taskRepository, 'findAll').mockImplementation(async () => []);

      await expect(getTasksUseCase.findAll()).rejects.toThrow(
        'Não foi possivel encontrar alguma tarefa. Crie uma!',
      );
    });
  });

  describe('findByStatus', () => {
    beforeEach(() => {
      const tasks = mockListTask();
      jest
        .spyOn(taskRepository, 'findByStatus')
        .mockImplementation(async () => [tasks[0], tasks[3]]);
    });

    it('should call repository with parameters', () => {
      getTasksUseCase.findByStatus('pendente');
      expect(taskRepository.findByStatus).toHaveBeenCalledWith('pendente');
    });

    it('should return filtered tasks', async () => {
      const response = await getTasksUseCase.findByStatus('pendente');

      const tasks = mockListTask();

      expect(response).toEqual([tasks[0], tasks[3]]);
    });

    it('should throw not found error', async () => {
      jest
        .spyOn(taskRepository, 'findByStatus')
        .mockImplementation(async () => []);

      await expect(getTasksUseCase.findByStatus('concluída')).rejects.toThrow(
        'Não foi possivel encontrar tarefas nesse filtro',
      );
    });
  });
});
