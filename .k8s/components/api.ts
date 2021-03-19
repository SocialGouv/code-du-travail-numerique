import { create } from "@socialgouv/kosko-charts/components/app";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { waitForHttp } from "@socialgouv/kosko-charts/utils/waitForHttp";
import { ok } from "assert";
import env from "@kosko/env";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
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
          cpu: "500m",
          memory: "1.5Gi",
        },
        // cpu=1000, memory=3Gi offers 17req/s
        limits: {
          cpu: "1000m",
          memory: "2Gi",
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

const deployment = manifests.find(
  (manifest: { kind: string }): manifest is Deployment =>
    manifest.kind === "Deployment"
);
ok(deployment);

const waitForElasticsearchIndexContainer = waitForHttp({
  name: "elasticsearch-index",
  url: "${ELASTICSEARCH_URL}/_cat/health?h=status",
});
waitForElasticsearchIndexContainer.image = "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-http:5.0.1"
waitForElasticsearchIndexContainer.envFrom = [
  { secretRef: { name: "api-secret" } },
];
addInitContainer(deployment, waitForElasticsearchIndexContainer);

//

export default [...manifests];
