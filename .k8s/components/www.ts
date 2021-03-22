import { create } from "@socialgouv/kosko-charts/components/app";
import env from "@kosko/env";
import { ok } from "assert";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";
import { addWaitForHttp } from "@socialgouv/kosko-charts/utils/addWaitForHttp";

ok(process.env.CI_ENVIRONMENT_URL, "Missing CI_ENVIRONMENT_URL");
const apiConfig = env.component("api");
const API_URL = new URL(`${process.env.CI_ENVIRONMENT_URL}/api/v1`);
API_URL.hostname = (apiConfig.subDomainPrefix ?? "api.") + API_URL.hostname;

const manifests = create("www", {
  env,
  config: {
    containerPort: 3000,
    container: {
      resources: {
        requests: {
          cpu: "200m",
          memory: "560Mi", // 400 + 160  ~(40% of 400)
        },
        limits: {
          cpu: "200m",
          memory: "560Mi",
        },
      },
      env: [
        {
          name: "API_URL",
          value: String(API_URL),
        },
        {
          name: "COMMIT",
          value: process.env.CI_COMMIT_SHA,
        },
        {
          name: "FRONTEND_HOST",
          value: process.env.CI_ENVIRONMENT_URL,
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

addWaitForHttp(deployment, "http://api");

//

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
