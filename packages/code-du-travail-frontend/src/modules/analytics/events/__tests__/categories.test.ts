import { routeBySource } from "@socialgouv/cdtn-utils";
import { PageCategory, pageCategoryFromPathname } from "../categories";

describe("PageCategory", () => {
  // Matomo tronque les tables Événements à 500 lignes et agrège le surplus dans
  // `- Others -`, irréversiblement. Ce test rend la contrainte exécutable plutôt
  // que documentaire.
  it("reste très en deçà du plafond de troncature Matomo", () => {
    expect(Object.keys(PageCategory).length).toBeLessThan(500);
  });

  it("n'a aucune valeur vide (Matomo rejette une catégorie vide)", () => {
    Object.values(PageCategory).forEach((category) => {
      expect(category).toBeTruthy();
    });
  });

  // Les catégories de contenu doivent se lire comme des routes du site. Ce test
  // casse si `routeBySource` évolue sans que l'enum suive.
  it.each([
    ["contributions", PageCategory.CONTRIBUTION],
    ["information", PageCategory.INFORMATION],
    ["conventions_collectives", PageCategory.CONVENTION_COLLECTIVE],
    ["modeles_de_courriers", PageCategory.MODELES_DE_COURRIERS],
    ["themes", PageCategory.THEMES],
    ["actualites", PageCategory.ACTUALITE],
    ["infographies", PageCategory.INFOGRAPHIE],
    ["fiches_service_public", PageCategory.FICHE_SERVICE_PUBLIC],
    ["fiches_ministere_travail", PageCategory.FICHE_MINISTERE_TRAVAIL],
    ["code_du_travail", PageCategory.CODE_DU_TRAVAIL],
    ["droit_du_travail", PageCategory.DROIT_DU_TRAVAIL],
    ["glossary", PageCategory.GLOSSAIRE],
    ["outils", PageCategory.OUTILS],
  ])("aligne la source %s sur sa route canonique", (source, category) => {
    expect(routeBySource[source as keyof typeof routeBySource]).toBe(category);
  });
});

describe("pageCategoryFromPathname", () => {
  it.each([
    ["/", PageCategory.HOME],
    ["", PageCategory.HOME],
    ["/contribution", PageCategory.CONTRIBUTION],
    ["/contribution/mon-slug", PageCategory.CONTRIBUTION],
    ["/information/mon-slug", PageCategory.INFORMATION],
    ["/convention-collective/1486", PageCategory.CONVENTION_COLLECTIVE],
    ["/modeles-de-courriers/demission", PageCategory.MODELES_DE_COURRIERS],
    ["/themes/conges-et-repos", PageCategory.THEMES],
    ["/actualite/mon-actu", PageCategory.ACTUALITE],
    ["/infographie/mon-info", PageCategory.INFOGRAPHIE],
    ["/fiche-service-public/x", PageCategory.FICHE_SERVICE_PUBLIC],
    ["/fiche-ministere-travail/x", PageCategory.FICHE_MINISTERE_TRAVAIL],
    ["/code-du-travail/L1234-1", PageCategory.CODE_DU_TRAVAIL],
    ["/droit-du-travail", PageCategory.DROIT_DU_TRAVAIL],
    ["/glossaire/abattement", PageCategory.GLOSSAIRE],
    ["/quoi-de-neuf/2026-08", PageCategory.QUOI_DE_NEUF],
    [
      "/quelles-regles-s-appliquent-dans-votre-entreprise",
      PageCategory.REGLES_ENTREPRISE,
    ],
    ["/recherche", PageCategory.RECHERCHE],
    ["/besoin-plus-informations", PageCategory.CONTACT],
    ["/widgets/search", PageCategory.WIDGET],
    ["/widgets/indemnite-licenciement", PageCategory.WIDGET],
    ["/mentions-legales", PageCategory.INSTITUTIONNEL],
    ["/stats", PageCategory.INSTITUTIONNEL],
  ])("classe %s en %s", (pathname, expected) => {
    expect(pageCategoryFromPathname(pathname)).toBe(expected);
  });

  // Le listing des simulateurs mesure un choix de parcours, une page de
  // simulateur mesure un tunnel : les confondre rendrait illisible le taux
  // d'entrée dans les simulateurs.
  it("distingue le listing des outils d'une page de simulateur", () => {
    expect(pageCategoryFromPathname("/outils")).toBe(PageCategory.OUTILS);
    expect(pageCategoryFromPathname("/outils/indemnite-licenciement")).toBe(
      PageCategory.OUTIL
    );
  });

  it("ignore query string et ancre", () => {
    expect(pageCategoryFromPathname("/recherche?q=conges")).toBe(
      PageCategory.RECHERCHE
    );
    expect(pageCategoryFromPathname("/contribution/x#reponse")).toBe(
      PageCategory.CONTRIBUTION
    );
  });

  it("retombe sur AUTRE plutôt que sur une catégorie vide", () => {
    expect(pageCategoryFromPathname("/route-inconnue")).toBe(
      PageCategory.AUTRE
    );
    expect(pageCategoryFromPathname(null)).toBe(PageCategory.HOME);
    expect(pageCategoryFromPathname(undefined)).toBe(PageCategory.HOME);
  });
});
