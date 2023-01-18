import { COMMIT, PACKAGE_VERSION } from "../../src/config";

export default function handler(_req, res) {
  res.status(200).json({
    status: "up and running",
    version: PACKAGE_VERSION,
    commit: COMMIT,
  });
}
