import { create } from "@socialgouv/kosko-charts/components/app";
import env from "@kosko/env";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX;

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/api/v1/version",
  port: "http",
};

export default async () => {
  const manifests = await create("api", {
    env,
    config: {
      subDomainPrefix: env.env === "prod" ? "api." : "api-",
      image: getHarborImagePath({ name: "cdtn-api" }),
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
            cpu: "500m",
            memory: "1Gi",
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

  return manifests;
};
