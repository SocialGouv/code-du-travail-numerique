const { Soit, Quand, Alors } = require("./_fr");

//

const { I } = inject();

//

Soit("un navigateur web sur le site", () => {
  I.amOnPage("/");
});

//

Quand("je pause le test", () => {
  pause();
});

Quand("je recherche {string}", searchText => {
  I.fillField("q", searchText);
});

Quand(
  "je cherche {string} dans le champ {string}",
  (searchText, searchInput) => {
    I.fillField(searchInput, searchText);
  },
);

Quand("je clique sur {string}", text => {
  I.click(text);
});

Quand("j'attends {string} secondes", duration => {
  I.wait(parseInt(duration, 10));
});

//

Alors("je vois {string}", text => {
  I.see(text);
});

Alors("le lien {string} pointe sur {string}", (text, url) => {
  I.seeElement(`//a[contains(., "${text}") and contains(./@href, "${url}")]`);
});

// plutôt un Quand ?
Alors("j'attends de voir les résultats de recherches", () => {
  I.waitForElement("[aria-label^='Résultats de recherche']", 5);
});
