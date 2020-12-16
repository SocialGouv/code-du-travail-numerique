//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  expect(
    await getEnvManifests("prod", "", {
      ...project("code-du-travail-numerique").prod,
    })
  ).toMatchSnapshot();
});
