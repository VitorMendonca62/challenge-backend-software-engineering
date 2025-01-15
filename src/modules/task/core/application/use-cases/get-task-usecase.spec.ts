import { getRepositoryForEnvironment } from '@modules/task/adaptars/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { mockTask } from '@modules/task/utils/test-helpers.util';
import { GetTaskUseCase } from './get-task.usecase';

describe('GetTaskUseCase', () => {
  let getTaskUseCase: GetTaskUseCase;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        GetTaskUseCase,
        {
          provide: TaskRepository,
          useFactory: () => getRepositoryForEnvironment(true),
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);

    getTaskUseCase = module.get<GetTaskUseCase>(GetTaskUseCase);
  });

  it('should be defined', () => {
    expect(getTaskUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('findById', () => {
    beforeEach(() => {
      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async () => mockTask());
    });

    it('should call repository with parameters', () => {
      getTaskUseCase.findById('TASKID');
      expect(taskRepository.findById).toHaveBeenCalledWith('TASKID');
    });

    it('should find task', async () => {
      const response = await getTaskUseCase.findById('TASKID');

      expect(response).toEqual(mockTask());
    });

    it('should throw not found task', async () => {
      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async () => undefined);

      await expect(getTaskUseCase.findById('TASKID')).rejects.toThrow(
        'Não foi possivel encontrar a tarefa',
      );
    });
  });
});
