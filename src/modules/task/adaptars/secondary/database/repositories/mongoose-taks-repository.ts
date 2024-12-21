import { Inject } from '@nestjs/common';
import { TaskRepository } from 'modules/task/core/application/ports/secondary/task-repository.interface';
import { Task, TaskStatus } from 'modules/task/core/domain/task.entity';
import { Model } from 'mongoose';

export class MongooseTaskRepository implements TaskRepository {
  constructor(
    @Inject('TASK_MODEL')
    private taskModel: Model<Task>,
  ) {}

  create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  findById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }
  findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }
  findByStatus(status: TaskStatus): Promise<Task[]> {
    return this.taskModel.find({ status }).exec();
  }
  update(id: string, newTask: Task): Promise<Task> {
    return this.taskModel
      .findOneAndUpdate({ id }, { ...newTask }, { new: true })
      .exec();
  }
  async delete(id: string): Promise<void> {
    this.taskModel.findOneAndDelete({ id }, { new: true }).exec();
  }
}
