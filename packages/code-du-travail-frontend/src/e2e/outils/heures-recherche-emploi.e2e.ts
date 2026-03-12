import { expect, Page, test } from "@playwright/test";

const TOOL_PATH = "/outils/heures-recherche-emploi";
const TOOL_TITLE =
  "Calculer le nombre d'heures d'absence pour rechercher un emploi";

async function startSimulation(page: Page) {
  await page.goto(TOOL_PATH);
  await expect(
    page.getByRole("heading", { level: 1, name: TOOL_TITLE })
  ).toBeVisible();
  await page.getByRole("button", { name: "Commencer" }).click();
}

async function clickNext(page: Page) {
  const button = page.getByRole("button", { name: "Suivant" }).last();
  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
  await button.click();
}

async function selectKnownAgreement(page: Page) {
  await page
    .locator(
      'label:has-text("Je sais quelle est ma convention collective et je la saisis.")'
    )
    .first()
    .click();
}

async function searchAndSelectAgreement(
  page: Page,
  search: string,
  optionText: string
) {
  await expect(
    page.getByText("Précisez et sélectionnez votre convention collective")
  ).toBeVisible();

  await page.locator("#agreement-search-autocomplete").fill(search);

  const option = page
    .locator('ul[role="listbox"] li')
    .filter({ hasText: optionText })
    .first();

  await expect(option).toBeVisible();
  await option.click();
}

async function expectTexts(page: Page, texts: string[]) {
  const main = page.locator("main");
  for (const text of texts) {
    await expect(main).toContainText(text);
  }
}

test.describe("Outil - Heures d'absence pour rechercher un emploi", () => {
  test("Parcours avec convention collective non traité", async ({ page }) => {
    await startSimulation(page);

    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();

    await selectKnownAgreement(page);
    await searchAndSelectAgreement(page, "1388", "Industrie du pétrole");

    await expect(
      page.getByText(
        "Nous n'avons pas de réponse pour cette convention collective"
      )
    ).toBeVisible();

    await clickNext(page);

    await expect(
      page.getByText(
        "Vous ne pouvez pas poursuivre la simulation avec cette convention collective."
      )
    ).toBeVisible();
  });

  test("Parcours en connaissant sa convention collective et sans information complémentaire", async ({
    page,
  }) => {
    await startSimulation(page);

    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();

    await selectKnownAgreement(page);
    await searchAndSelectAgreement(page, "843", "Boulangerie");

    await clickNext(page);

    await expect(
      page.getByText(
        "Pour quelle raison le contrat de travail a-t-il été rompu ?"
      )
    ).toBeVisible();

    await page
      .locator(
        "#input-infos-contrat-salarie-convention-collective-boulangerie-patisserie-typeRupture"
      )
      .selectOption({ label: "Licenciement" });

    await clickNext(page);

    await expectTexts(page, [
      "Nombre d'heures d'absence autorisée pour rechercher un emploi",
      "2 heures d'absence par jour pendant la dernière semaine du préavis",
      "Rémunération pendant les heures d'absence autorisée",
      "Le salaire est maintenu. Les heures non utilisés dans ce cadre ne donnent pas lieu à rémunération.",
      "Conditions d'utilisation",
      "Les heures sont fixées un jour par l' employeur et le suivant par le salarié. Ils peuvent décider de regrouper tout ou partie de ces heures.",
      "Boulangerie-pâtisserie (entreprises artisanales)",
      "Licenciement",
    ]);
  });

  test("Parcours en connaissant sa convention collective et avec informations complémentaires", async ({
    page,
  }) => {
    await startSimulation(page);

    await expect(
      page.getByText("Quel est le nom de la convention collective applicable ?")
    ).toBeVisible();

    await selectKnownAgreement(page);
    await searchAndSelectAgreement(
      page,
      "787",
      "Personnel des cabinets d'experts-comptables et de commissaires aux comptes"
    );

    await clickNext(page);

    await expect(
      page.getByText(
        "Pour quelle raison le contrat de travail a-t-il été rompu ?"
      )
    ).toBeVisible();

    await page
      .locator(
        "#input-infos-contrat-salarie-convention-collective-comptables-typeRupture"
      )
      .selectOption({ label: "Démission" });

    await expect(
      page.getByText("Quelle est l'ancienneté du salarié ?")
    ).toBeVisible();

    await page
      .locator(
        "#input-infos-contrat-salarie-convention-collective-comptables-typeRupture-Demission-anciennete"
      )
      .selectOption({ label: "Au moins 5 ans" });

    await clickNext(page);

    await expectTexts(page, [
      "Nombre d'heures d'absence autorisée pour rechercher un emploi",
      "2 heures par journée d'ouverture du cabinet",
      "Rémunération pendant les heures d'absence autorisée",
      "Le salaire est maintenu.",
      "Conditions d'utilisation",
      "Les heures sont fixées d'un commun accord entre l'employeur et le salarié. En l'absence d'accord, ces absences sont fixées un jour par l'employeur et le salarié. Le salarié qui a retrouvé un emploi ne peut plus utiliser ces heures.",
      "Personnel des cabinets d'experts-comptables et de commissaires aux comptes",
      "Démission",
      "Au moins 5 ans",
    ]);
  });
});
