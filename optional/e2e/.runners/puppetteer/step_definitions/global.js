const { Soit, Quand, Alors } = require('./_fr');

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

//

Alors("je vois {string}", text => {
  I.see(text);
});

Alors("je clique sur {string}", text => {
  I.click(text);
});
