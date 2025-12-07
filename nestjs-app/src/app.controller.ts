import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JobService } from './job.service';

@Controller()
export class AppController {
  constructor(private readonly jobService: JobService) {}

  @Get('healthcheck')
  healthCheck(): string {
    return 'OK';
  }

  @Get('run-job')
  async runJob() {
    const jobName = `nestjs-job-${Date.now()}`;
    const image = 'nestjs-job:1.0'; // Your Job Docker image

    const job = await this.jobService.triggerJob(jobName, image);
    return {
      message: 'Job triggered successfully',
      jobName: job.metadata?.name,
    };

    // return this.jobService.runPredefinedJob();

    /*    return this.jobService.runJobFromTemplate(); */
  }
}
