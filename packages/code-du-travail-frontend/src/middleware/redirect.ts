import { NextApiRequest, NextApiResponse } from "next";
import Router from "next/router";

import { urlRulesReplacement } from "../lib";

export function serverSideRedirectMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req && req.url && res) {
    const urlReplaced = urlRulesReplacement(req.url);
    if (req.url !== urlReplaced) {
      res.writeHead(301, {
        Location: urlReplaced,
      });
      res.end();
    }
  }
}

export function clientSideRedirectMiddleware(): void {
  Router.events.on("routeChangeComplete", (path) => {
    const urlReplaced = urlRulesReplacement(path);
    if (path !== urlReplaced) {
      Router.replace(urlReplaced);
    }
  });
}
