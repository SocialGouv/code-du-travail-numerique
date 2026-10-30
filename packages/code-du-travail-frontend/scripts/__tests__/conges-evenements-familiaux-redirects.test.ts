import redirects from "../../redirects.json";

// #7516 : les anciennes URL `/contribution/<idcc>-les-conges-pour-evenements-familiaux`
// doivent arriver sur l'URL finale en un seul saut, en 301. Passer par
// `/contribution/les-conges-pour-evenements-familiaux/<idcc>` ajouterait le
// `permanentRedirect` de la page (308) comme second saut.
const SLUG = "les-conges-pour-evenements-familiaux";
const SOURCE_REGEX = new RegExp(`^/contribution/(\\d+)-${SLUG}$`);
const DESTINATION_REGEX = new RegExp(
  `^/contribution/${SLUG}/(\\d+)-[a-z0-9-]+$`
);

type Redirect = {
  source: string;
  destination: string;
  permanent?: boolean;
  statusCode?: number;
};

const congesRedirects = (redirects as Redirect[]).filter(({ source }) =>
  SOURCE_REGEX.test(source)
);

describe("Redirections des congés pour événements familiaux", () => {
  it("couvre les 48 conventions collectives", () => {
    expect(congesRedirects).toHaveLength(48);
  });

  it.each(congesRedirects)(
    "$source redirige en 301 vers l'URL finale",
    (redirect) => {
      expect(redirect.statusCode).toBe(301);
      expect(redirect.permanent).toBeUndefined();

      const [, sourceIdcc] = redirect.source.match(SOURCE_REGEX)!;
      const destinationMatch = redirect.destination.match(DESTINATION_REGEX);
      expect(destinationMatch?.[1]).toBe(sourceIdcc);
    }
  );

  it("ne crée pas de chaîne de redirections", () => {
    const sources = new Set(
      (redirects as Redirect[]).map(({ source }) => source)
    );
    congesRedirects.forEach(({ destination }) => {
      expect(sources.has(destination)).toBe(false);
    });
  });

  it("place les entrées explicites avant la règle générique", () => {
    const list = redirects as Redirect[];
    const fallbackIndex = list.findIndex(
      ({ source }) => source === `/contribution/:idcc(\\d+)-${SLUG}`
    );
    const lastExplicitIndex = list.lastIndexOf(
      congesRedirects[congesRedirects.length - 1]
    );
    expect(fallbackIndex).toBeGreaterThan(lastExplicitIndex);
    expect(list[fallbackIndex].statusCode).toBe(301);
  });
});
