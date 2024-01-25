import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.page || !(typeof req.query.page === "string")) {
    return res.status(401).json({ message: "You have to set a page" });
  }

  if (req.query.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(req.query.page);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
