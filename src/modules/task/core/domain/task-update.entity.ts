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
  expiresOn?: Date;
  updatedAt: Date;

  constructor(data: TaskUpdate) {
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.expiresOn && !isNaN(data.expiresOn.getTime()))
      this.expiresOn = data.expiresOn;
    if (data.updatedAt) this.updatedAt = data.updatedAt;
  }

  static toJson(task: TaskUpdate) {
    const object = Object();

    if (task.title) object.title = task.title;
    if (task.description) object.description = task.description;
    if (task.status) object.status = task.status;
    if (task.expiresOn) object.expiresOn = task.expiresOn;
    if (task.updatedAt) object.updatedAt = task.updatedAt;

    return object;
  }
}
