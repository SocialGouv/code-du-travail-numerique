import { pathToRegexp } from "next/dist/compiled/path-to-regexp";
import redirects from "../../redirects.json";

// Garde-fou de la checklist SEO (#7519, cf. BEST_PRACTICE.md) : une ancienne
// URL doit arriver sur sa page finale en un seul saut. Une destination qui est
// elle-même la source d'une autre redirection crée une chaîne, que Google suit
// mal et qui fait perdre du trafic.
type Redirect = {
  source: string;
  destination: string;
};

const list = redirects as Redirect[];

// Mêmes options que Next pour compiler les `source` de `redirects()`.
const sourceMatchers = list.map((redirect) => ({
  redirect,
  regexp: pathToRegexp(redirect.source, [], {
    strict: true,
    sensitive: false,
    delimiter: "/",
  }),
}));

describe("redirects.json", () => {
  it("ne contient pas de source en double", () => {
    const sources = list.map(({ source }) => source);
    expect(sources.filter((s, i) => sources.indexOf(s) !== i)).toEqual([]);
  });

  it("ne contient pas de chaîne de redirections", () => {
    const chains = list
      // Une destination paramétrée (`/themes/:slug`) ne peut pas être évaluée
      // statiquement.
      .filter(({ destination }) => !destination.includes(":"))
      .flatMap((redirect) =>
        sourceMatchers
          .filter(
            ({ redirect: other, regexp }) =>
              other !== redirect && regexp.test(redirect.destination)
          )
          .map(
            ({ redirect: other }) =>
              `${redirect.source} → ${redirect.destination} → ${other.destination}`
          )
      );

    expect(chains).toEqual([]);
  });
});
