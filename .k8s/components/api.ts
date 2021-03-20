import { create } from "@socialgouv/kosko-charts/components/app";
import env from "@kosko/env";
import type { IIoK8sApiCoreV1HTTPGetAction } from "kubernetes-models/v1";

import { ES_INDEX_PREFIX } from "../utils/ES_INDEX_PREFIX";

const httpGet: IIoK8sApiCoreV1HTTPGetAction = {
  path: "/api/v1/version",
  port: "http",
};

const manifests = create("api", {
  env,
  config: {
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
          name: "ES_INDEX_PREFIX",
          value: ES_INDEX_PREFIX,
        },
      ],
    },
  },
});

//

export default [...manifests];
