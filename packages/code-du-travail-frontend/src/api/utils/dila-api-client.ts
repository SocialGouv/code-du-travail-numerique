import Debug from "debug";
import fetch from "node-fetch";
import { ClientCredentials } from "simple-oauth2";
import { API_HOST, CONFIG, TOKEN_HOST } from "./constants";

const debug = Debug("@socialgouv/dila-api-client");

export class DilaApiClient {
  public globalToken?: string;

  constructor(
    public apiHost = API_HOST,
    public tokenHost = TOKEN_HOST
  ) {}

  public async getAccessToken(config = CONFIG) {
    if (this.globalToken) {
      return this.globalToken;
    }
    const client = new ClientCredentials(config);

    try {
      const accessToken = await client.getToken({
        scope: "openid",
      });
      this.globalToken = accessToken.token.access_token;
    } catch (error: unknown) {
      debug("error", error);
      if (error instanceof Error) {
        debug("Access Token error", error.message);
      }
      throw error;
    }
    return this.globalToken;
  }

  public async fetch({
    path,
    method = "POST",
    params,
  }: {
    path: string;
    method?: string;
    params: object;
  }): Promise<any> {
    const [routeName] = path.split("/").slice(-1);
    const body = JSON.stringify(params);
    debug(`fetching route ${routeName} with ${body}...`);
    const token = await this.getAccessToken();
    const url = `${this.apiHost}/${path}`;
    debug(`fetch route ${routeName}...`);
    const data = await fetch(url, {
      body,
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      method,
    })
      .then(async (r) => {
        const responseBody = await r.text();

        debug(
          `fetch route ${routeName} DONE => ${JSON.stringify({
            status: r.status,
            statusText: r.statusText,
            headers: Object.fromEntries(r.headers.entries()),
            body: responseBody,
          })}`
        );
        if (r.status === 401 && this.globalToken) {
          this.globalToken = undefined;
          return this.fetch({ path, method, params });
        }
        try {
          return JSON.parse(responseBody);
        } catch {
          return responseBody;
        }
      })
      .catch((error) => {
        debug(`fetch route ${routeName} ERROR => ${JSON.stringify(error)}`);
        throw error;
      });
    debug(`fetch route ${routeName} DATA => ${JSON.stringify(data)}`);
    if (data.error) {
      throw new Error(`Error on API fetch: ${JSON.stringify(data)}`);
    }

    return data;
  }
}
