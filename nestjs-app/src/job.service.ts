import { Injectable, Logger } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  private readonly batchV1Api: k8s.BatchV1Api;
  private k8sApi: k8s.BatchV1Api;

  constructor() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.BatchV1Api);

    try {
      kc.loadFromCluster(); // in-cluster
    } catch {
      kc.loadFromDefault(); // local dev
    }

    this.batchV1Api = kc.makeApiClient(k8s.BatchV1Api);
  }

  async triggerJob(jobName: string, image: string) {
    const jobManifest: k8s.V1Job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: { name: jobName },
      spec: {
        ttlSecondsAfterFinished: 3600,
        template: {
          spec: {
            containers: [
              {
                name: jobName,
                image,
              },
            ],
            restartPolicy: 'Never',
          },
        },
      },
    };

    // ✅ createNamespacedJob returns Promise<{ response: http.IncomingMessage; body: V1Job }>
    const response = await this.batchV1Api.createNamespacedJob({
      namespace: 'default',
      body: jobManifest,
    });

    this.logger.log(`Job ${jobName} triggered v2`);

    // Access the job manifest via response.body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response;
  }
  /*  async runPredefinedJob(): Promise<string> {
    // Load the predefined job YAML
    const jobPath = path.join(__dirname, '../job.yaml'); // since dist/ is one level down
    const jobYaml = fs.readFileSync(jobPath, 'utf8');
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const jobManifest: k8s.V1Job = yaml.load(fileContents) as k8s.V1Job;
    await this.k8sApi.createNamespacedJob('default', jobManifest);
    
    const deleteRequest: k8s.BatchV1ApiDeleteNamespacedJobRequest = {
      name: 'nestjs-job',
      namespace: 'default',
      propagationPolicy: 'Foreground', // deletes pods created by the job
      gracePeriodSeconds: 0,
    };
    // Optional: delete previous Job if it exists
    try {
      await this.k8sApi.deleteNamespacedJob(deleteRequest);
      console.log('Job deleted successfully');
    } catch (err) {
      console.log('Job not found, skipping delete');
    }

    const createRequest: k8s.BatchV1ApiCreateNamespacedJobRequest = {
      namespace: 'default',
      body: jobManifest,
    };

    // Create the Job
    const res = await this.k8sApi.createNamespacedJob(createRequest);

    return `Job  triggered`;
  } */

  /*  async runJobFromTemplate(): Promise<string> {
    try {
      // 1️⃣ Read template YAML from container root
      const jobPath = path.join(__dirname, '../nestjs-job-template.yaml');
      const fileContents = fs.readFileSync(jobPath, 'utf8');

      // 2️⃣ Parse YAML
      const jobManifest: k8s.V1Job = yaml.load(fileContents) as k8s.V1Job;

      // 3️⃣ Create the Job in Kubernetes (no need to set name, generateName will work)
      const res = await this.k8sApi.createNamespacedJob('default', jobManifest);

      const jobName = 'job';
      this.logger.log(`Job ${jobName} triggered successfully`);
      return `Job ${jobName} created`;
    } catch (err) {
      this.logger.error('Failed to trigger Job', err);
      throw err;
    }
  } */
}
