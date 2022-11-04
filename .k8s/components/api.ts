import env from "@kosko/env";
import { ok } from "assert";

import { create } from "@socialgouv/kosko-charts/components/app";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/api/v1/version",
  port: "http",
};

export default async () => {
  const manifests = await create("api", {
    env,
    config: {
      subDomainPrefix: env.env === "prod" ? "api." : "api-",
      image: getGithubRegistryImagePath({
        name: "code-du-travail-api",
        project: "cdtn",
      }),
      containerPort: 1337,
      container: {
        livenessProbe: {
          httpGet,
          initialDelaySeconds: 15,
          timeoutSeconds: 15,
        },
        readinessProbe: {
          httpGet,
          initialDelaySeconds: 5,
          timeoutSeconds: 3,
        },
        startupProbe: {
          httpGet,
          initialDelaySeconds: 0,
          timeoutSeconds: 15,
        },
        resources: {
          requests: {
            cpu: "50m",
            memory: "128Mi",
          },
          limits: {
            cpu: "500m",
            memory: "1Gi",
          },
        },
        env: [
          {
            name: "ELASTIC_APM_ENVIRONMENT",
            value: process.env.ELASTIC_APM_ENVIRONMENT,
          },
          {
            name: "ES_INDEX_PREFIX",
            value: process.env.ES_INDEX_PREFIX,
          },
          {
            name: "VERSION",
            value: process.env.GITHUB_REF,
          },
        ],
      },
    },
  });

  // make some adjustments on generated manifests
  const deployment = manifests.find(
    (manifest): manifest is Deployment => manifest.kind === "Deployment"
  );
  ok(deployment);
  ok(deployment.spec);

  const hpa = new HorizontalPodAutoscaler({
    metadata: deployment.metadata,
    spec: {
      minReplicas: 2,
      maxReplicas: 10,

      metrics: [
        {
          resource: {
            name: "cpu",
            target: {
              averageUtilization: 80,
              type: "Utilization",
            },
          },
          type: "Resource",
        },
        {
          resource: {
            name: "memory",
            target: {
              averageUtilization: 80,
              type: "Utilization",
            },
          },
          type: "Resource",
        },
      ],

      scaleTargetRef: {
        apiVersion: deployment.apiVersion,
        kind: deployment.kind,
        name: deployment.metadata!.name!,
      },
    },
  });

  //

  if (env.env === "prod") {
    manifests.push(hpa);
  }

  return manifests;
};
