import { test, expect } from "@playwright/test";
import { expectCanonicalUrlEqual, expectIndexable } from "./helpers";

// Actualité présente dans le jeu de données de test (scripts/data), datée
// 07/04/2026 → heure d'été, minuit Paris = +02:00.
const NEWS_PATH =
  "/actualite/saisir-le-conseil-de-prudhommes-une-contribution-de-50-depuis-le-1er-mars-2026";
// Instant de publication attendu : le 7 avril 2026 à minuit heure de Paris.
// Selon l'environnement, il est servi :
//  - depuis la date affichée (minuit Paris) : `2026-04-07T00:00:00+02:00` ;
//  - depuis `publishedAt` (renseigné par l'admin, même instant) :
//    `2026-04-06T22:00:00.000Z`.
// On compare donc les instants (`Date.parse`) et non leurs sérialisations. La
// date affichée, elle, est saisie dans l'admin et peut évoluer : on ne vérifie
// que son format.
const NEWS_INSTANT = Date.parse("2026-04-07T00:00:00+02:00");

test.describe("Actualités", () => {
  test("la page de détail expose un NewsArticle daté en ISO 8601, une balise <time> et les métadonnées article", async ({
    page,
  }) => {
    await page.goto(NEWS_PATH);
    await expectIndexable(page);
    await expectCanonicalUrlEqual(page, NEWS_PATH);

    // JSON-LD NewsArticle : dates ISO 8601 avec heure et fuseau. `dateModified`
    // est au moins l'instant de publication (une édition admin le rend
    // postérieur).
    const jsonLd = await page
      .locator("script#jsonld-news-article")
      .textContent();
    expect(jsonLd).not.toBeNull();
    const newsArticle = JSON.parse(jsonLd as string);
    expect(newsArticle["@type"]).toBe("NewsArticle");
    expect(Date.parse(newsArticle.datePublished)).toBe(NEWS_INSTANT);
    expect(Date.parse(newsArticle.dateModified)).toBeGreaterThanOrEqual(
      NEWS_INSTANT
    );

    // « Publié le » + <time dateTime> : la date affichée est saisie dans
    // l'admin (elle peut différer de l'instant de publication et évoluer),
    // on vérifie le contrat de format et non sa valeur.
    const time = page.locator("main time").first();
    await expect(time).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    // La date est écrite avec des espaces insécables, que `\s` couvre.
    await expect(time).toHaveText(/^\d{1,2}(er)?\s[a-zéû]+\s\d{4}$/);
    await expect(time.locator("xpath=..")).toHaveText(
      /^Publié le \d{1,2}(er)?\s[a-zéû]+\s\d{4}$/
    );

    // Open Graph article.
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article"
    );
    const publishedTime = await page
      .locator('meta[property="article:published_time"]')
      .getAttribute("content");
    expect(Date.parse(publishedTime as string)).toBe(NEWS_INSTANT);
    const modifiedTime = await page
      .locator('meta[property="article:modified_time"]')
      .getAttribute("content");
    expect(Date.parse(modifiedTime as string)).toBeGreaterThanOrEqual(
      NEWS_INSTANT
    );
    await expect(
      page.locator('meta[property="article:section"]')
    ).toHaveAttribute("content", "Actualités");
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute(
      "content",
      /max-snippet:-1, max-image-preview:large/
    );
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      "content",
      canonical as string
    );

    // Déclaration du flux RSS.
    await expect(
      page.locator('link[rel="alternate"][type="application/rss+xml"]')
    ).toHaveAttribute("href", /\/actualite\/rss\.xml$/);

    // Bouton RSS dans le bloc « Partager la page ».
    const rssLink = page.getByRole("link", {
      name: /Flux RSS des actualités/,
    });
    await expect(rssLink).toBeVisible();
    await expect(rssLink).toHaveAttribute("href", "/actualite/rss.xml");
  });

  test("la liste déclare le flux RSS sans bloc de partage et affiche « Publié le »", async ({
    page,
  }) => {
    await page.goto("/actualite");
    await expect(
      page.locator('link[rel="alternate"][type="application/rss+xml"]')
    ).toHaveAttribute("href", /\/actualite\/rss\.xml$/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website"
    );
    await expect(page.getByText("Partager la page")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: /Flux RSS des actualités/ })
    ).toHaveCount(0);
    // Lien « Flux RSS » sous le titre de la liste.
    await expect(
      page.getByRole("link", { name: "Flux RSS", exact: true })
    ).toHaveAttribute("href", "/actualite/rss.xml");

    // Chaque actualité listée porte sa date dans une balise <time> ISO,
    // précédée de « Publié le ». On ne présume pas de l'actualité en tête de
    // liste : elle dépend des données de l'environnement. La date est écrite
    // avec des espaces insécables, que `\s` couvre.
    const firstTime = page.locator("main time").first();
    await expect(firstTime).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    await expect(firstTime).toHaveText(/^\d{1,2}(er)?\s[a-zéû]+\s\d{4}$/);
    await expect(firstTime.locator("xpath=..")).toHaveText(
      /^Publié le \d{1,2}(er)?\s[a-zéû]+\s\d{4}$/
    );
  });

  test("les contenus éditoriaux sont des articles Open Graph sans bouton RSS", async ({
    page,
  }) => {
    await page.goto("/information/exemples-de-contrats-de-travail-cdi-et-cdd");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article"
    );
    await expect(
      page.locator('meta[property="article:published_time"]')
    ).toHaveAttribute("content", /^\d{4}-\d{2}-\d{2}T00:00:00\+0[12]:00$/);
    await expect(
      page.getByRole("link", { name: /Flux RSS des actualités/ })
    ).toHaveCount(0);
  });

  test("les pages hors contenu gardent og:type website", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website"
    );
  });

  test("le flux RSS est servi en RSS 2.0", async ({ request }) => {
    const response = await request.get("/actualite/rss.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe(
      "application/rss+xml; charset=utf-8"
    );

    const body = await response.text();
    expect(body.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(
      true
    );
    expect(body).toContain('<rss version="2.0"');
    expect(body).toContain(
      "<title>Actualités - Code du travail numérique</title>"
    );
    expect(body).toContain(
      '<atom:link rel="self" type="application/rss+xml" href="'
    );
    expect(body).toContain(`<link>`);
    expect(body).toContain(NEWS_PATH);
    // `pubDate` de cette actualité : même instant que le 7 avril 2026 minuit
    // Paris, servi en GMT quand `publishedAt` est connu, à minuit Paris sinon.
    const item = body
      .split("<item>")
      .find((chunk) => chunk.includes(NEWS_PATH));
    expect(item).toBeDefined();
    const pubDate = item?.match(/<pubDate>([^<]+)<\/pubDate>/)?.[1];
    expect(pubDate).toBeDefined();
    expect(Date.parse(pubDate as string)).toBe(NEWS_INSTANT);
    expect(body).not.toContain("<dc:date>");
    expect(body).not.toContain("content:encoded");
  });
});
