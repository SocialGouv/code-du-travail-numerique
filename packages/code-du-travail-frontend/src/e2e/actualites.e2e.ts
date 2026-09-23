import { test, expect } from "@playwright/test";
import { expectCanonicalUrlEqual, expectIndexable } from "./helpers";

// Actualité présente dans le jeu de données de test (scripts/data), datée
// 07/04/2026 → heure d'été, minuit Paris = +02:00.
const NEWS_PATH =
  "/actualite/saisir-le-conseil-de-prudhommes-une-contribution-de-50-depuis-le-1er-mars-2026";
const NEWS_ISO_DATE_TIME = "2026-04-07T00:00:00+02:00";

test.describe("Actualités", () => {
  test("la page de détail expose un NewsArticle daté en ISO 8601, une balise <time> et les métadonnées article", async ({
    page,
  }) => {
    await page.goto(NEWS_PATH);
    await expectIndexable(page);
    await expectCanonicalUrlEqual(page, NEWS_PATH);

    // JSON-LD NewsArticle : dates ISO 8601 avec heure et fuseau (minuit Paris).
    const jsonLd = await page
      .locator("script#jsonld-news-article")
      .textContent();
    expect(jsonLd).not.toBeNull();
    const newsArticle = JSON.parse(jsonLd as string);
    expect(newsArticle["@type"]).toBe("NewsArticle");
    expect(newsArticle.datePublished).toBe(NEWS_ISO_DATE_TIME);
    expect(newsArticle.dateModified).toBe(NEWS_ISO_DATE_TIME);

    // « Publié le » + <time dateTime>.
    const time = page.locator("main time").first();
    await expect(time).toHaveAttribute("datetime", "2026-04-07");
    await expect(time).toHaveText("7 avril 2026");
    await expect(page.locator("main")).toContainText("Publié le 7 avril 2026");

    // Open Graph article.
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "article"
    );
    await expect(
      page.locator('meta[property="article:published_time"]')
    ).toHaveAttribute("content", NEWS_ISO_DATE_TIME);
    await expect(
      page.locator('meta[property="article:modified_time"]')
    ).toHaveAttribute("content", NEWS_ISO_DATE_TIME);

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

    // Chaque actualité listée porte sa date dans une balise <time> ISO,
    // précédée de « Publié le ». On ne présume pas de l'actualité en tête de
    // liste : elle dépend des données de l'environnement.
    const firstTime = page.locator("main time").first();
    await expect(firstTime).toHaveAttribute("datetime", /^\d{4}-\d{2}-\d{2}$/);
    await expect(firstTime).toHaveText(/^\d{1,2}(er)? [a-zéû]+ \d{4}$/);
    await expect(firstTime.locator("xpath=..")).toHaveText(
      /^Publié le \d{1,2}(er)? [a-zéû]+ \d{4}$/
    );
  });

  test("les pages non-actualité gardent og:type website et pas de bouton RSS", async ({
    page,
  }) => {
    await page.goto("/information/exemples-de-contrats-de-travail-cdi-et-cdd");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
      "content",
      "website"
    );
    await expect(
      page.getByRole("link", { name: /Flux RSS des actualités/ })
    ).toHaveCount(0);
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
    expect(body).toContain(
      "<pubDate>Tue, 07 Apr 2026 00:00:00 +0200</pubDate>"
    );
    expect(body).not.toContain("<dc:date>");
    expect(body).not.toContain("content:encoded");
  });
});
