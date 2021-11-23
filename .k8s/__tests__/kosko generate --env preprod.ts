import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  process.env.HARBOR_PROJECT = "cdtn";
  process.env.ES_INDEX_PREFIX = "cdtn-preprod";
  process.env.KUBE_NAMESPACE = "cdtn";
  expect(
    await getEnvManifests("preprod", "", {
      ...project("code-du-travail-numerique").preprod,
      RANCHER_PROJECT_ID: "c-bar:p-foo",
    })
  ).toMatchSnapshot();
});
