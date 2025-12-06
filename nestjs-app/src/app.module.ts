import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobService } from './job.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, JobService],
})
export class AppModule {}
