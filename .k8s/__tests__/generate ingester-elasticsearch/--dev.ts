//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate ingester-elasticsearch --dev", async () => {
  expect(
    await getEnvManifests("dev", "ingester-elasticsearch", {
      ...project("code-du-travail-numerique").dev,
      CDTN_ADMIN_ENDPOINT: "https://cdtn-admin.fabrique.social.gouv.fr/api/graphql",
      CI_JOB_ID: "424242",
      RANCHER_PROJECT_ID: "c-bar:p-foo",
    })
  ).toMatchSnapshot();
});
