import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function handler(_req, res) {
  res.status(200).json({
    status: "up and running",
    version: publicRuntimeConfig.APP_VERSION,
  });
}
