import { buildNewsRssFeed, NewsRssItem } from "../rss";

const items: NewsRssItem[] = [
  {
    title: "Indemnisation en cas d'arrêt maladie : ce qui change",
    slug: "indemnisation-arret-maladie",
    date: "18/09/2026",
    meta_description: "Les règles d'indemnisation changent au 15 octobre.",
  },
  {
    title: "Saisir le Conseil de prud'hommes : une contribution de 50 €",
    slug: "saisir-le-conseil-de-prudhommes",
    date: "07/04/2026",
    meta_description: "",
  },
];

describe("buildNewsRssFeed()", () => {
  it("génère un flux RSS 2.0 avec les items dans l'ordre", () => {
    const xml = buildNewsRssFeed(items);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain(
      "<title>Actualités - Code du travail numérique</title>"
    );
    expect(xml).toContain("<link>http://api.url/actualite</link>");
    expect(xml).toContain("<language>fr</language>");
    expect(xml).toContain("<ttl>60</ttl>");
    expect(xml).toContain(
      "<image><url>http://api.url/static/assets/img/logo-marianne.png</url><title>Actualités - Code du travail numérique</title><link>http://api.url/actualite</link><width>109</width><height>40</height></image>"
    );
    expect(xml).toContain(
      '<atom:link rel="self" type="application/rss+xml" href="http://api.url/actualite/rss.xml"/>'
    );
    expect(xml).toContain(
      "<lastBuildDate>Fri, 18 Sep 2026 00:00:00 +0200</lastBuildDate>"
    );
    expect(xml.indexOf("indemnisation-arret-maladie")).toBeLessThan(
      xml.indexOf("saisir-le-conseil-de-prudhommes")
    );
    expect(xml).toMatchSnapshot();
  });

  it("décrit chaque item par titre, lien, guid, description et pubDate RFC 822", () => {
    const xml = buildNewsRssFeed([items[0]]);
    expect(xml).toContain(
      "<link>http://api.url/actualite/indemnisation-arret-maladie</link>"
    );
    expect(xml).toContain(
      '<guid isPermaLink="true">http://api.url/actualite/indemnisation-arret-maladie</guid>'
    );
    expect(xml).toContain(
      "<description>Les règles d&apos;indemnisation changent au 15 octobre.</description>"
    );
    expect(xml).toContain("<pubDate>Fri, 18 Sep 2026 00:00:00 +0200</pubDate>");
    // Le validateur W3C déconseille de doubler pubDate d'un dc:date.
    expect(xml).not.toContain("<dc:date>");
    expect(xml).toContain("<dc:creator>Code du travail numérique</dc:creator>");
  });

  it("n'inclut pas le contenu de l'actualité", () => {
    const xml = buildNewsRssFeed(items);
    expect(xml).not.toContain("content:encoded");
  });

  it("omet la description quand la meta description est vide", () => {
    const xml = buildNewsRssFeed([items[1]]);
    const item = xml.slice(xml.indexOf("<item>"), xml.indexOf("</item>"));
    expect(item).not.toContain("<description>");
  });

  it("échappe les caractères XML dans les titres", () => {
    const xml = buildNewsRssFeed([
      { ...items[0], title: 'Salaires & primes : <ce qui change> "vite"' },
    ]);
    expect(xml).toContain(
      "<title>Salaires &amp; primes : &lt;ce qui change&gt; &quot;vite&quot;</title>"
    );
    expect(xml).not.toContain("<ce qui change>");
  });

  it("place une actualité sans date valide en fin de flux, sans pubDate", () => {
    const undated: NewsRssItem = {
      title: "Sans date",
      slug: "sans-date",
      date: "pas une date",
      meta_description: "Description",
    };
    const xml = buildNewsRssFeed([undated, ...items]);
    const undatedItem = xml.slice(
      xml.indexOf("<item><title>Sans date</title>"),
      xml.indexOf("</item>", xml.indexOf("<item><title>Sans date</title>"))
    );
    expect(undatedItem).not.toContain("<pubDate>");
    expect(xml.indexOf("<title>Sans date</title>")).toBeGreaterThan(
      xml.indexOf("saisir-le-conseil-de-prudhommes")
    );
    // lastBuildDate reste celle de l'actualité datée la plus récente.
    expect(xml).toContain(
      "<lastBuildDate>Fri, 18 Sep 2026 00:00:00 +0200</lastBuildDate>"
    );
  });

  it("reste valide sans aucune actualité", () => {
    const xml = buildNewsRssFeed([]);
    expect(xml).toContain("<channel>");
    expect(xml).not.toContain("<item>");
    expect(xml).not.toContain("<lastBuildDate>");
  });
});
