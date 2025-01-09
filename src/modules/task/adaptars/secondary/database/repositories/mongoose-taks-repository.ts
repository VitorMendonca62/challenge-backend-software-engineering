import { MongooseService } from '@modules/database/mongoose.service';
import { TaskRepository } from '@modules/task/core/application/ports/secondary/task-repository.interface';
import { TaskUpdate } from '@modules/task/core/domain/task-update.entity';
import { Task, TaskStatus } from '@modules/task/core/domain/task.entity';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

export class MongooseTaskRepository implements TaskRepository {
  taskModel: Model<Task>;

  constructor() {
    const databaseService = new MongooseService(new ConfigService());
    databaseService.getModel().then((model) => {
      this.taskModel = model;
    });
  }

  create(task: Task): Promise<Task> {
    return new this.taskModel(task).save();
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

  async update(id: string, newTask: TaskUpdate): Promise<Task> {
    return this.taskModel
      .findOneAndUpdate({ _id: id }, newTask, {
        new: true,
      })
      .exec();
  }
  async delete(id: string): Promise<void> {
    this.taskModel.findOneAndDelete({ _id: id }, { new: true }).exec();
  }
}
