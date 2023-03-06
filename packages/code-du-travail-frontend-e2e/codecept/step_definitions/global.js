const { Soit, Quand, Alors } = require("./_fr");
const assert = require("assert");

const { I } = inject();

//

Soit("un utilisateur sur la page d'accueil", () => {
  I.amOnPage("/");
});

Soit("un utilisateur sur la page {string}", (page) => {
  I.amOnPage(`${page}`);
});

//

Quand("j'attends {int} secondes", (num) => {
  I.wait(num);
});

Quand("je pause le test", () => {
  pause();
});

Quand("je recherche {string}", (searchText) => {
  I.fillField("q", searchText);
});

Quand("je renseigne {string} dans le champ {string}", async (text, input) => {
  I.resetInputFocus(input);
  I.fillField(input, text);
  I.pressKey("Enter");
});

Quand(
  "je renseigne {string} dans le champ avec le css {string}",
  async (text, input) => {
    I.fillField({ css: input }, text);
  }
);

Quand("je clique sur {string}", async (text) => {
  I.click(text);
});

Quand("je choisis {string}", (text) => {
  I.checkOption(text);
});

Quand(
  "je sélectionne {string} dans la liste {string}",
  (optionName, selectName) => {
    I.selectOption(selectName, optionName);
  }
);

Quand("je ferme la modale", () => {
  I.click('button[title="fermer la modale"]');
});

Quand("j'ouvre l'accordion", () => {
  I.click('div[role="button"][aria-expanded="false"]');
});

Quand("j'attends que les suggestions apparaissent", () => {
  I.waitForElement("//ul[@role='listbox']", 3);
});

Quand("j'attends que les résultats de recherche apparaissent", () => {
  I.waitForElement("[aria-label^='Résultats de recherche']", 10);
});

Quand("j'attends que le titre de page {string} apparaisse", (title) => {
  I.scrollPageToTop();
  I.waitForElement(`//h1[contains(., "${title}")]`, 10);
});

Quand("j'attends que le texte {string} apparaisse", (text) => {
  I.waitForText(text, 10);
  I.scrollTo(`//*[text()[starts-with(., "${text}")]]`, 0, -100);
});

Quand("je scroll à {string}", (text) => {
  I.scrollTo(`//*[text()[starts-with(., "${text}")]]`, 0, -140);
});

Quand("je télécharge en cliquant sur {string}", (dowloadText) => {
  I.handleDownloads();
  I.click(`//*[text()[starts-with(., "${dowloadText}")]]`);
});

//

Alors("je vois {string}", (text) => {
  I.see(text);
});

Alors("je ne vois pas {string}", (text) => {
  I.dontSee(text);
});

Alors("je vois le bouton {string}", (text) => {
  I.seeElement(`//button[text()="${text}"]`);
});

Alors("je vois le lien {string}", (text) => {
  I.seeElement(`//a[contains(., "${text}")]`);
});

Alors("je vois que bouton {string} est désactivé", (text) => {
  I.seeElement(`//button[text()="${text}" and @disabled]`);
});

Alors("le lien {string} pointe sur {string}", (text, url) => {
  I.seeElement(`//a[contains(., "${text}") and contains(@href, "${url}")]`);
});

Alors("je vois {string} fois le {string} {string}", (num, element, text) => {
  I.seeNumberOfVisibleElements(
    `//${element}[contains(., "${text}")]`,
    parseInt(num, 10)
  );
});

Alors("je vois {string} suggestions", (num) => {
  I.seeNumberOfVisibleElements("//ul[@role='listbox']//li", parseInt(num, 10));
});

Alors("je vois {string} résultats sous le texte {string}", (num, title) => {
  const target = `following-sibling::*//li//a`;
  const textMatcher = `text()[starts-with(., "${title}")]`;
  I.seeNumberOfVisibleElements(
    `//header[*[${textMatcher}]]/${target} | //div/*[${textMatcher}]/${target}`,
    parseInt(num, 10)
  );
});

Alors("je vois {string} tuiles sous le texte {string}", (num, title) => {
  const target = `following-sibling::*//div//a`;
  const textMatcher = `text()[starts-with(., "${title}")]`;
  I.seeNumberOfVisibleElements(
    `//header[*[${textMatcher}]]/${target} | //div/*[${textMatcher}]/${target}`,
    parseInt(num, 10)
  );
});

Alors("je vois le thème {string}", (theme) => {
  I.seeElement(`//a[text()="${theme}" and starts-with(@href, "/themes/")]`);
});

Quand("je regarde dans l'iframe {string}", async (iframe) => {
  I.switchTo(iframe);
});

Alors("je ne vois pas le thème {string}", (theme) => {
  I.dontSeeElement(`//a[text()="${theme}" and starts-with(@href, "/themes/")]`);
});

Alors("je suis redirigé vers la page: {string}", (url) => {
  // also check search and hash
  I.waitForFunction(
    (url) =>
      window.location.pathname +
        window.location.search +
        window.location.hash ===
      url,
    [url],
    10
  );
});

Alors("j'ai téléchargé le fichier {string}", (filename) => {
  I.amInPath("output/downloads");
  I.seeFile(filename);
});

Alors("le status de la page est {int}", async (num) => {
  const url = await I.grabCurrentUrl();
  const statusCode = await I.getStatusCode(url);
  if (statusCode !== num) {
    assert.fail(
      `Le status de la page ${statusCode} est différent de celui prévu (${num})`
    );
  }
});
