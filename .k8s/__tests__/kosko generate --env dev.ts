//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --dev", async () => {
  expect(
    await getEnvManifests("dev", "", {
      ...project("code-du-travail-numerique").dev,
      KUBE_NAMESPACE: "foo-XYZ-master-dev2",
      RANCHER_PROJECT_ID: "c-bar:p-foo",
    })
  ).toMatchSnapshot();
});
