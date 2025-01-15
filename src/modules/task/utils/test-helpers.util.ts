import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';
import { TaskStatus, Task } from '@modules/task/core/domain/task.entity';
import { CreateTaskDTO } from '../adaptars/primary/http/dto/create-task.dto';
import { UpdateTaskDTO } from '../adaptars/primary/http/dto/update-task.dto';

export const mockCreateTask = (overrides = {}): CreateTaskDTO => ({
  title: 'Default Title',
  status: 'pendente' as TaskStatus,
  ...overrides,
});

export const mockListTask = () => {
  const task01 = mockTask({ title: 'Task01' });
  const task02 = mockTask({ title: 'Task02', status: 'concluída' });
  const task03 = mockTask({ title: 'Task03', status: 'realizando' });
  const task04 = mockTask({ title: 'Task04' });

  return [task01, task02, task03, task04];
};

export const mockTask = (overrides: CreateTaskDTO | object = {}) =>
  new Task({
    ...mockCreateTask(overrides),
    createdAt: new Date('Tue Jan 14 2025 11:38:38'),
    updatedAt: new Date('Tue Jan 14 2025 11:38:38'),
  });

export const mockUpdateTask = (overrides: UpdateTaskDTO | object = {}) => {
  if ((overrides as UpdateTaskDTO).expiresOn)
    (overrides as UpdateTaskDTO).expiresOn = new Date(
      (overrides as UpdateTaskDTO).expiresOn,
    );

  return new TaskUpdate({
    ...mockCreateTask(overrides),
    updatedAt: new Date('Tue Jan 14 2025 11:38:38'),
  });
};
