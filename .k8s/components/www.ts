import env from "@kosko/env";
import { ok } from "assert";

import { create } from "@socialgouv/kosko-charts/components/app";
import { addWaitForHttp } from "@socialgouv/kosko-charts/utils/addWaitForHttp";
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import { EnvVar } from "kubernetes-models/v1/EnvVar";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";

import getApiManifests from "./api";

ok(process.env.CI_ENVIRONMENT_URL, "Missing CI_ENVIRONMENT_URL");

// all probes httpGet
const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/health",
  port: "http",
};

export default async () => {
  // extract computed url from API manifests for the frontend
  const apiManifests = await getApiManifests();
  const API_URL = "https://" + getIngressHost(apiManifests) + "/api/v1";

  const productionConfig = {
    domain: "travail.gouv.fr",
    subdomain: "code",
  };

  const manifests = await create("www", {
    env,
    config: {
      containerPort: 3000,
      image: getHarborImagePath({ name: "cdtn-frontend" }),
      ...(env.env === "prod" ? productionConfig : {}),
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
          initialDelaySeconds: 10,
          timeoutSeconds: 15,
        },
        resources: {
          requests: {
            cpu: "200m",
            memory: "256Mi",
          },
          limits: {
            cpu: "500m",
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
            name: "VERSION",
            value: process.env.CI_COMMIT_REF_NAME,
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

  // add a wait condition on the API service with an initContainer
  addWaitForHttp(deployment, "http://api");

  // get frontend computed url and assign the env var
  const ingressHost = new EnvVar({
    name: "FRONTEND_HOST",
    value: getIngressHost(manifests),
  });

  addEnv({ deployment, data: ingressHost });

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

  if (env.env === "prod") {
    manifests.push(hpa);
  }

  return manifests;
};
