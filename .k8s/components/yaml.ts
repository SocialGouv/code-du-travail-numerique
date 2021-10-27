import env from "@kosko/env";
import { importYamlFolder } from "@socialgouv/kosko-charts/components/yaml";
import path from "path";

const manifests = importYamlFolder(
  path.join(__dirname, "..", `environments/${env.env}/yaml`)
);
export default manifests;
