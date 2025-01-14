import { Types } from 'mongoose';

export enum EnumTaskStatus {
  Pending = 'pendente',
  Doing = 'realizando',
  Completed = 'concluída',
}

export type TaskStatus = 'pendente' | 'realizando' | 'concluída';

export class Task {
  _id?: Types.ObjectId | string;
  title: string;
  description?: string;
  status: TaskStatus;
  expiresOn?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Task) {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.expiresOn) this.expiresOn = data.expiresOn;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }

  static toJson(task: Task) {
    return {
      title: task.title,
      description: task.description,
      status: task.status,
      expiresOn: task.expiresOn,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
