import { Injectable, Logger } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';

@Injectable()
export class JobService {
  private readonly logger = new Logger(JobService.name);
  private readonly batchV1Api: k8s.BatchV1Api;

  constructor() {
    const kc = new k8s.KubeConfig();

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

    this.logger.log(`Job ${jobName} triggered`);

    // Access the job manifest via response.body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response;
  }
}
