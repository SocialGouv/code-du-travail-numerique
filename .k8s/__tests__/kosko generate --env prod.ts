import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  process.env.HARBOR_PROJECT = "cdtn";
  process.env.ES_INDEX_PREFIX = "cdtn-preprod";
  expect(
    await getEnvManifests("prod", "", { ...project("cdtn").prod })
  ).toMatchSnapshot();
});
