import { create } from "@socialgouv/kosko-charts/components/app";
import env from "@kosko/env";
import { ok } from "assert";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";

import { ES_INDEX_PREFIX } from "../utils/ES_INDEX_PREFIX";

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/api/v1/version",
  port: "http",
};

const manifests = create("api", {
  env,
  config: {
    subDomainPrefix: "api.",
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
          cpu: "100m",
          memory: "320Mi",
        },
        limits: {
          cpu: "100m",
          memory: "320Mi",
        },
      },
      env: [
        {
          name: "ELASTIC_APM_ENVIRONMENT",
          value: `cdtn-${process.env.CI_ENVIRONMENT_SLUG}`,
        },
        {
          name: "ES_INDEX_PREFIX",
          value: ES_INDEX_PREFIX,
        },
        {
          name: "VERSION",
          value: process.env.CI_COMMIT_REF_NAME,
        },
      ],
    },
  },
});

const deployment = manifests.find(
  (manifest): manifest is Deployment => manifest.kind === "Deployment"
);
ok(deployment);

const hpa = new HorizontalPodAutoscaler({
  metadata: deployment.metadata,
  spec: {
    minReplicas: 1,
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

if (process.env.CI_COMMIT_TAG) {
  manifests.push(hpa);
}

//

export default [...manifests];
