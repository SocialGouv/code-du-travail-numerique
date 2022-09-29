import fs from "fs";
import path from "path";

const conventionsPath = path.resolve(__dirname, "../../modeles/conventions");

const allowedFileName = [
  "common.yaml",
  "preavis-retraite.yaml",
  "indemnite-licenciement.yaml",
];

const conventionDirs = fs.readdirSync(conventionsPath);
describe("Vérification du nommage des fichiers du modèle des conventions collectives", () => {
  test.each(conventionDirs)(`convention (%p)`, (dir) => {
    const fullpath = path.join(conventionsPath, dir);
    const files = fs.readdirSync(fullpath);
    expect(files.filter((file) => allowedFileName.includes(file)).length).toBe(
      files.length
    );
  });
});
