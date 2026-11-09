/**
 * @jest-environment node
 */
import { getClientEnvScript, getRuntimeEnv } from "../runtime-env";

describe("runtime-env", () => {
  const original = { ...process.env };

  afterEach(() => {
    process.env = { ...original };
  });

  it("lit la valeur dans process.env côté serveur", () => {
    process.env.SITE_URL = "https://exemple.test";
    expect(getRuntimeEnv("SITE_URL")).toBe("https://exemple.test");
  });

  it("retourne undefined pour une valeur vide", () => {
    process.env.SITE_URL = "";
    expect(getRuntimeEnv("SITE_URL")).toBeUndefined();
  });

  it("n'expose au navigateur que les variables client", () => {
    process.env.SITE_URL = "https://exemple.test";
    process.env.ES_INDEX_PREFIX = "secret-prefix";
    process.env.ELASTICSEARCH_PASSWORD = "secret";
    const script = getClientEnvScript();
    expect(script).toContain("https://exemple.test");
    expect(script).not.toContain("secret");
  });

  it("échappe les caractères pouvant fermer la balise script", () => {
    process.env.SITE_URL = "</script><script>alert(1)</script>";
    const script = getClientEnvScript();
    expect(script).not.toContain("</script>");
    expect(script).toContain("\\u003c/script>");
  });
});
