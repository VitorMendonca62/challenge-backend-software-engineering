export enum EnumTaskStatus {
  Pending = 'pendente',
  Doing = 'realizando',
  Completed = 'concluida',
}

export type TaskStatus = 'pendente' | 'realizando' | 'concluída';

export class Task {
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  expiresOn?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Task) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.expiresOn = data.expiresOn;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static toJson(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      expiresOn: task.expiresOn,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
