# Code du travail - API (@cdt/api)

API permettant d'intérroger les différentes sources de données relatives au Code du travail numérique.

## Usage

### Local dev

```sh
export ELASTICSEARCH_URL=http://127.0.0.1:9200
yarn dev
```

### Docker image

Get the `@cdt/api` image from the [Social Gitlab Registry](https://gitlab.factory.social.gouv.fr/SocialGouv/code-du-travail-numerique/container_registry)

```sh
$ docker run --rm \
    --name cdtn_api \
    -p 1337:1337 \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version

# With options

$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://elasticsearch:9200" \
    -e NLP_URL=https://serving-ml-preprod.dev.fabrique.social.gouv.fr/ \
    -e VERSION="foo" \
    registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique/api:<commit hash>
$ curl http://localhost:1337/api/v1/version
```

### Local build

```sh
# You need a parent monorepo image !
# You can download it from our registry
$ docker pull registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash>
$ docker tag registry.gitlab.factory.social.gouv.fr/socialgouv/code-du-travail-numerique:<commit hash> cdtn_master:local

# Or build it
# From where this README.md is :
$ docker build -t cdtn_master:local ../..

#

$ docker build -t cdtn_api:local --build-arg BASE_IMAGE=cdtn_master:local .
$ docker run --rm \
    --name cdtn_api \
    -p 1337:80 \
    -e PORT=80 \
    -e ELASTICSEARCH_LOG_LEVEL="info" \
    -e ELASTICSEARCH_URL="http://localhost:9200" \
    -e VERSION="local" \
    cdtn_api:local

$ curl http://localhost:1337/api/v1/version
```

### Local test elasticsearch

#### 1. Add this file in folder test

```ts
import type { SuperTest } from "supertest";
import supertest from "supertest";

import { app } from "..";

const mostSearches = [
  "3239", // popular
  "indemnités de licenciement",
  "indemnité licenciement",
  "congés payés",
  "rupture conventionnelle cdi",
  "licenciement",
  "convention collective",
  "heures supplémentaires",
  "période d'essai",
  "licenciement inaptitude",
  "Préavis",
  "Congés payés et fractionnement",
  "Solde de tout compte",
  "amiante", // pré-qualifié
  "covid 19 (variante de coronavirus)",
  "lettre de démission (variante de lettre-demission)",
  "syntec", // synonymes
  "1596",
  "1597",
  "HCR",
];

describe("Search - Snapshot result", () => {
  let server: any;
  let request: SuperTest<any>;

  beforeEach(() => {
    server = app.listen(3000);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  it("should be defined", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: "running" });
  });

  it.each(mostSearches)("should return a result for %s", async (search) => {
    const url = `/api/v1/search?q=${encodeURIComponent(search)}`;
    const res = await request.get(url);
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
```

#### 2. Run this command

```sh
yarn workspace @cdt/api test:default -- -t 'Search - Snapshot result'
```
