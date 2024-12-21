export enum EnumTaskStatus {
  Pending = 'pendente',
  Doing = 'realizando',
  Completed = 'concluida',
}

export type TaskStatus = 'pendente' | 'realizando' | 'concluída';

export class TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  updatedAt: Date;

  constructor(data: TaskUpdate) {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }

  static toJson(task: TaskUpdate) {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      updatedAt: task.updatedAt,
    };
  }
}
