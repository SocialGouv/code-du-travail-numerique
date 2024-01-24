import { NextApiRequest, NextApiResponse } from "next";
import { getAllContributions } from "../../src/api";

const MAIN_PAGES = [
  "/",
  "/themes",
  "/outils",
  "/modeles-de-courriers",
  "/glossaire",
  "/convention-collective",
  "/contribution",
  "/plan-du-site",
  "/stats",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.token !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  let pages: string[];

  if (req.query.page && typeof req.query.page === "string") {
    pages = [req.query.page];
  } else {
    const contribs = await getAllContributions();

    const CONTRIBUTIONS_PAGES = contribs.map((v) => `/contribution/${v.slug}`);

    pages = [...MAIN_PAGES, ...CONTRIBUTIONS_PAGES];
  }

  try {
    const regens = await Promise.all(pages.map((path) => res.revalidate(path)));
    await Promise.all(regens);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
