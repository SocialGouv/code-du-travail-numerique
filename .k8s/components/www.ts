import env from "@kosko/env";
import { ok } from "assert";

import { create } from "@socialgouv/kosko-charts/components/app";
import { addWaitForHttp } from "@socialgouv/kosko-charts/utils/addWaitForHttp";
import { addEnv } from "@socialgouv/kosko-charts/utils/addEnv";
import { getIngressHost } from "@socialgouv/kosko-charts/utils/getIngressHost";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import { EnvVar } from "kubernetes-models/v1/EnvVar";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";

import getApiManifests from "./api";

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
      image: getGithubRegistryImagePath({
        name: "code-du-travail-frontend",
        project: "cdtn",
      }),
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
        resources:
          env.env === "prod" ? ressourcesConfigProd : ressourcesConfigDev,
        env: [
          {
            name: "API_URL",
            value: String(API_URL),
          },
          {
            name: "COMMIT",
            value: process.env.GITHUB_SHA,
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
      minReplicas: 2,
      maxReplicas: 20,

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

const ressourcesConfigProd = {
  requests: {
    cpu: "250m",
    memory: "768Mi",
  },
  limits: {
    cpu: "500m",
    memory: "1Gi",
  },
};

const ressourcesConfigDev = {
  requests: {
    cpu: "50m",
    memory: "256Mi",
  },
  limits: {
    cpu: "250m",
    memory: "512Mi",
  },
};
