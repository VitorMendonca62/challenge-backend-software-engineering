import { getRepositoryForEnvironment } from '@modules/task/adaptars/utils/repository.util';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import {
  mockTask,
  mockUpdateTask,
} from '@modules/task/utils/test-helpers.util';
import { UpdateTaskUseCase } from './update-task.usecase';

describe('UpdateTaskUseCase', () => {
  let updateTaskUseCase: UpdateTaskUseCase;

  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        UpdateTaskUseCase,
        {
          provide: TaskRepository,
          useFactory: () => getRepositoryForEnvironment(true),
        },
      ],
    }).compile();

    taskRepository = module.get<TaskRepository>(TaskRepository);

    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
  });

  it('should be defined', () => {
    expect(updateTaskUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  describe('execute', () => {
    beforeEach(() => {
      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async (id) =>
          mockTask({ status: 'pendente', _id: id }),
        );
      jest
        .spyOn(taskRepository, 'update')
        .mockImplementation(async (id) =>
          mockTask({ status: 'concluída', _id: id }),
        );
    });

    it('should call repository with parameters', async () => {
      const newTask = mockUpdateTask({ status: 'realizando' });

      await updateTaskUseCase.execute('TASKID', newTask);

      expect(taskRepository.findById).toHaveBeenCalledWith('TASKID');
      expect(taskRepository.update).toHaveBeenCalledWith('TASKID', newTask);
    });

    it('should update task and return new task', async () => {
      const response = await updateTaskUseCase.execute(
        'TASKID',
        mockUpdateTask({ status: 'concluída' }),
      );

      expect(response).toEqual(
        mockTask({ status: 'concluída', _id: 'TASKID' }),
      );
    });

    it('should throw not found task', async () => {
      jest
        .spyOn(taskRepository, 'findById')
        .mockImplementation(async () => undefined);

      await expect(
        updateTaskUseCase.execute(
          'TASKID',
          mockUpdateTask({ status: 'concluída' }),
        ),
      ).rejects.toThrow('Não foi possivel encontrar a tarefa');
    });
  });
});
