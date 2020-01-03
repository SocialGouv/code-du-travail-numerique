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

Quand("je clique sur {string}", text => {
  I.click(text);
});

//

Alors("je vois {string}", text => {
  I.see(text);
});

Alors("j'attends de voir les résultats de recherches", () => {
  I.waitForElement("[aria-label^='Résultats de recherche']", 1.5);
});
