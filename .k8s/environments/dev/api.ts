import { AppConfig } from "@socialgouv/kosko-charts/components/app";

export default {
  container: {
    resources: {
      requests: {
        cpu: "100m",
        memory: "256Mi",
      },
      limits: {
        cpu: "200m",
        memory: "320Mi",
      },
    },
  },
} as Partial<AppConfig>;
