import env from "@kosko/env";
import { ok } from "assert";

import { EnvVar } from "kubernetes-models/v1/EnvVar";
import { restoreContainerJob } from "@socialgouv/kosko-charts/components/azure-storage/restore-container.job";

ok(process.env.SOURCE_CONTAINER);
ok(process.env.DESTINATION_CONTAINER);
ok(process.env.SOURCE_SERVER === "prod" || process.env.SOURCE_SERVER === "dev");
ok(
  process.env.DESTINATION_SERVER === "prod" ||
    process.env.DESTINATION_SERVER === "dev"
);

const manifests = restoreContainerJob({
  env: [
    new EnvVar({
      name: "SOURCE_CONTAINER",
      value: process.env.SOURCE_CONTAINER,
    }),
    new EnvVar({
      name: "DESTINATION_CONTAINER",
      value: process.env.DESTINATION_CONTAINER,
    }),
  ],
  project: "cdtn-admin",
  from: process.env.SOURCE_SERVER,
  to: process.env.DESTINATION_SERVER,
});

export default manifests;
