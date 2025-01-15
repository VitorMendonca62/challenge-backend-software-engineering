import { Module } from '@nestjs/common';
import { TaskModule } from '@modules/task/task.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { TessssssssssssService } from './tessssssssssss/tessssssssssss.service';
@Module({
  imports: [
    TaskModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
  ],
  providers: [TessssssssssssService],
})
export class AppModule {}
