import { xssWrapper } from "../xss";

describe("XSS Security", () => {
  test("HTML Accordion Button (for fiche MT)", () => {
    const src =
      '<button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    expect(xssWrapper(src)).toBe(src);
  });
  test("HTML Accordion Button with onClick injection (for fiche MT)", () => {
    const src =
      '<button class="fr-accordion__btn" onClick="() => { alert("xss"); }" onBlur="() => { alert("xss"); }" onmouseover="() => { alert("xss"); }" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    expect(xssWrapper(src)).toBe(src);
  });
  test("Balise time (for fiche MT)", () => {
    const src =
        '<div class="fr-enlarge-link fr-card"><div class="fr-card__body"><div class="fr-card__content"><h3 class="fr-card__title"><a href="https://travail-emploi.gouv.fr/la-prevention-des-accidents-du-travail-pour-les-jeunes-et-nouveaux-embauches" class="fr-card__link" target="_blank" rel="nofollow, noopener">La prévention des accidents du travail pour les jeunes et nouveaux arrivants</a></h3><p class="fr-card__desc">Vous êtes chef d’entreprise et vous recrutez régulièrement des jeunes en formation professionnelle ? Vous êtes salarié et vous…</p><div class="fr-card__start"><p class="fr-tag--sm fr-tag"> Prévention des risques </p><p class="fr-card__detail">Date de mise à jour le <time datetime="2024-10-09T12:00:00Z">9 octobre 2024</time></p></div></div></div><div class="fr-card__header"><div class="fr-card__img"><img src="https://travail-emploi.gouv.fr/sites/travail-emploi/files/styles/thumbnail_ondine_16_9/public/2024-07/logo-protection-jeunes-contrat-courts_0.png.webp" width="800" height="450" alt="La prévention des accidents du travail pour les jeunes et nouveaux embauchés" class="fr-fluid-img"></div></div></div>';
    expect(xssWrapper(src)).toBe(src);
  });
});
