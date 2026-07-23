import { ModuleOptions } from "simple-oauth2";

const CLIENT_ID = process.env.OAUTH_CLIENT_ID || "";
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || "";

export const API_HOST =
  process.env.API_HOST ||
  "https://api.piste.gouv.fr/dila/legifrance/lf-engine-app";

export const TOKEN_HOST =
  process.env.TOKEN_HOST || "https://oauth.piste.gouv.fr/api/oauth/token";

export const CONFIG: ModuleOptions = {
  auth: {
    authorizePath: "/api/oauth/authorize",
    tokenHost: TOKEN_HOST,
    tokenPath: "/api/oauth/token",
  },
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET,
  },
  options: {
    authorizationMethod: "body",
  },
};
