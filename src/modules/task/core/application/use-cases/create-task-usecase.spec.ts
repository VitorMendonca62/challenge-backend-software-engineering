import { getRepositoryForEnvironment } from '@modules/task/adaptars/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { CreateTaskUseCase } from './create-task.usecase';
import { mockTask } from '@modules/task/utils/test-helpers.util';

describe('CreateTaskUseCase', () => {
  let createTaskUseCase: CreateTaskUseCase;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        CreateTaskUseCase,
        {
          provide: TaskRepository,
          useFactory: () => getRepositoryForEnvironment(true),
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);

    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
  });

  it('should be defined', () => {
    expect(createTaskUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('execute', () => {
    beforeEach(() => {
      jest
        .spyOn(taskRepository, 'create')
        .mockImplementation(async (task) => task);
    });

    it('should call repository with parameters', () => {
      createTaskUseCase.execute(mockTask());
      expect(taskRepository.create).toHaveBeenCalledWith(mockTask());
    });

    it('should create task and return the task', async () => {
      const response = await createTaskUseCase.execute(
        mockTask({ title: 'Task 01' }),
      );

      expect(response).toEqual(mockTask({ title: 'Task 01' }));
    });
  });
});
