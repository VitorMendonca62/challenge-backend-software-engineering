import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskRepository } from '../ports/secondary/task-repository.interface';
import { CreateTaskDTO } from 'modules/task/adaptars/primary/rest/dto';
import { EnumTaskStatus } from '../../domain/task.entity';

describe('TetService', () => {
  let taskService: TaskService;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const mockProductRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByStatus: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TaskRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  it('should taskService be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should taskRepository be defined', () => {
    expect(taskRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a task', () => {
      const body: CreateTaskDTO = {
        title: 'title Task',
        description: 'description Task',
        expiresOn: new Date('2024-05-12'),
      };

      const task = 
    });
  });
});
