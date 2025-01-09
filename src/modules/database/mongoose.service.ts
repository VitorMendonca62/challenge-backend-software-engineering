import { TaskSchema } from '@modules/task/adaptars/secondary/database/schemas/task.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

@Injectable()
export class MongooseService {
  constructor(private readonly configService: ConfigService) {}
  connection: mongoose.Mongoose;

  connect() {
    return mongoose.connect(this.configService.get<string>('DATABASE_URL'));
  }

  async getModel() {
    return (await this.connect()).model('Task', TaskSchema);
  }
}
