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
    this.title = data.title;
    this.description = data.description;
    this.status = data.status;
    this.expiresOn = data.expiresOn;
    this.createdAt = new Date();
    this.updatedAt = new Date();
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
