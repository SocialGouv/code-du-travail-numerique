//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  expect(
    await getEnvManifests("preprod", "", {
      ...project("code-du-travail-numerique").preprod,
      KUBE_NAMESPACE: "foo-XYZ-preprod-dev2",
      RANCHER_PROJECT_ID: "c-bar:p-foo",
    })
  ).toMatchSnapshot();
});
