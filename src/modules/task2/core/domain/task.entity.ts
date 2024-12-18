// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum EnumTaskStatus {
  Pending = 'pendente',
  Doing = 'realizando',
  Completed = 'concluida',
}

export type TaskStatus = 'pendente' | 'realizando' | 'concluída';

export class Task {
  id: string;
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
}
