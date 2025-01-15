import { getRepositoryForEnvironment } from '@modules/task/adaptars/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { mockTask } from '@modules/task/utils/test-helpers.util';
import { DeleteTaskUseCase } from './delete-task.usecase';

describe('DeleteTaskUseCase', () => {
  let deleteTaskUseCase: DeleteTaskUseCase;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        DeleteTaskUseCase,
        {
          provide: TaskRepository,
          useFactory: () => getRepositoryForEnvironment(true),
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);

    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
  });

  it('should be defined', () => {
    expect(deleteTaskUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('execute', () => {
    beforeEach(() => {
      jest
        .spyOn(taskRepository, 'delete')
        .mockImplementation(async () => undefined);

      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async () => mockTask());
    });

    it('should call repository with parameters', async () => {
      await deleteTaskUseCase.execute('TASKID');
      expect(taskRepository.delete).toHaveBeenCalledWith('TASKID');
      expect(taskRepository.findById).toHaveBeenCalledWith('TASKID');
    });

    it('should delete task', async () => {
      const response = await deleteTaskUseCase.execute('TASKID');

      expect(response).toBeUndefined();
    });

    it('should throw not found task', async () => {
      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async () => undefined);

      await expect(deleteTaskUseCase.execute('TASKID')).rejects.toThrow(
        'Não foi possivel encontrar a tarefa',
      );
    });
  });
});
