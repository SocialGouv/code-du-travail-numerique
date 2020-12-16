//

import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

jest.setTimeout(1000 * 60);
test("kosko generate --prod restore", async () => {
  process.env.SOURCE_CONTAINER = "source-container";
  process.env.SOURCE_SERVER = "prod";
  process.env.DESTINATION_CONTAINER = "destination-container";
  process.env.DESTINATION_SERVER = "dev";
  process.env.BACKUP_DB_OWNER = "some-owner";
  process.env.BACKUP_DB_NAME = "some-database";
  process.env.BACKUP_DB_FILE = "some-backup.sql.gz";
  expect(
    await getEnvManifests("prod", "restore", {
      ...project("code-du-travail-numerique").prod,
    })
  ).toMatchSnapshot();
});
