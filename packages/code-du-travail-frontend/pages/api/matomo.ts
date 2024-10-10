import { NextApiRequest, NextApiResponse } from "next";
import { PIWIK_SITE_ID, PIWIK_URL } from "../../src/config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { url, actionName } = req.body;
    if (!url || !actionName) {
      return res.status(400).json({ message: "missing url or actionName" });
    }
    const { MatomoTracker } = require("matomo-tracker");
    const matomo = new MatomoTracker(PIWIK_SITE_ID, PIWIK_URL);
    matomo.track({
      url,
      action_name: actionName,
    });

    return res.status(200).json({ message: "success" });
  }
  return res.status(405).json({ message: "method not allowed" });
}
