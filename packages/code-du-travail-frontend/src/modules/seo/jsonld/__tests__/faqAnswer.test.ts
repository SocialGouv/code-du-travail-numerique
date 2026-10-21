import { contentToFaqAnswerHtml } from "../faqAnswer";

describe("contentToFaqAnswerHtml()", () => {
  it("retourne une chaîne vide sans contenu", () => {
    expect(contentToFaqAnswerHtml(undefined)).toBe("");
    expect(contentToFaqAnswerHtml("")).toBe("");
  });

  it("conserve les balises acceptées par Google, sans attributs", () => {
    expect(
      contentToFaqAnswerHtml(
        '<h3 class="x">Titre</h3><p style="color:red">Un <strong>texte</strong> et <em>un</em> autre</p><ul><li>a</li><li>b</li></ul>'
      )
    ).toBe(
      "<h3>Titre</h3><p>Un <strong>texte</strong> et <em>un</em> autre</p><ul><li>a</li><li>b</li></ul>"
    );
  });

  it("rend les liens absolus et supprime les ancres vides ou internes", () => {
    const out = contentToFaqAnswerHtml(
      '<p><a href="/outils/convention-collective" target="_blank" rel="noopener">CC</a> <a href="https://exemple.fr/x">ext</a> <a href="#haut">haut</a></p>'
    );
    expect(out).toMatch(
      /<a href="https?:\/\/[^"]+\/outils\/convention-collective">CC<\/a>/
    );
    expect(out).toContain('<a href="https://exemple.fr/x">ext</a>');
    expect(out).not.toContain("#haut");
    expect(out).not.toContain("target");
  });

  it("met à plat un accordéon : titre en gras puis contenu", () => {
    expect(
      contentToFaqAnswerHtml(
        "<details><summary>Contrat d'apprentissage</summary><p>Selon l'âge.</p></details>"
      )
    ).toBe(
      "<p><strong>Contrat d'apprentissage</strong></p><p>Selon l'âge.</p>"
    );
  });

  it("transforme un tableau en liste « ligne : colonne : valeur »", () => {
    const html =
      "<table><thead><tr><th>Année du contrat</th><th>Moins de 18 ans</th><th>18 à 20 ans</th></tr></thead>" +
      "<tbody><tr><td>1re année</td><td>504,10 €</td><td>802,82 €</td></tr>" +
      "<tr><td>2e année</td><td>728,14 €</td><td></td></tr></tbody></table>";
    expect(contentToFaqAnswerHtml(html)).toBe(
      "<p><strong>Année du contrat</strong></p>" +
        "<ul><li>1re année : Moins de 18 ans : 504,10 €, 18 à 20 ans : 802,82 €</li>" +
        "<li>2e année : Moins de 18 ans : 728,14 €</li></ul>"
    );
  });

  it("traite la première ligne comme en-tête même sans <th> (comme DisplayContent)", () => {
    const html =
      "<table><tbody><tr><td>Âge</td><td>Apprenti</td><td>Alternant</td></tr>" +
      "<tr><td>Moins de 21 ans</td><td>55 %</td><td>65 %</td></tr></tbody></table>";
    expect(contentToFaqAnswerHtml(html)).toBe(
      "<p><strong>Âge</strong></p><ul><li>Moins de 21 ans : Apprenti : 55 %, Alternant : 65 %</li></ul>"
    );
  });

  it("n'ajoute pas une étiquette de colonne redondante avec la valeur", () => {
    const html =
      "<table><tbody><tr><td>Décès d’un enfant</td><td>Jours</td></tr>" +
      "<tr><td>Cas général</td><td>12 jours</td></tr></tbody></table>";
    expect(contentToFaqAnswerHtml(html)).toBe(
      "<p><strong>Décès d’un enfant</strong></p><ul><li>Cas général : 12 jours</li></ul>"
    );
  });

  it("répète le libellé d'une cellule d'en-tête fusionnée (colspan)", () => {
    const html =
      '<table><tbody><tr><td>Diplôme</td><td colspan="2">Entreprises</td></tr>' +
      "<tr><td>CAP</td><td>5 000 €</td><td>2 000 €</td></tr></tbody></table>";
    expect(contentToFaqAnswerHtml(html)).toBe(
      "<p><strong>Diplôme</strong></p><ul><li>CAP : Entreprises : 5 000 €, Entreprises : 2 000 €</li></ul>"
    );
  });

  it("garde une ligne unique comme contenu", () => {
    expect(
      contentToFaqAnswerHtml(
        "<table><tbody><tr><td>Mariage</td><td>4 jours</td></tr></tbody></table>"
      )
    ).toBe("<ul><li>Mariage : 4 jours</li></ul>");
  });

  it("recalcule les montants challenger dans les cellules d'un tableau", () => {
    const html =
      "<table><tbody><tr><td>Âge</td><td>Montant</td></tr>" +
      '<tr><td>26 ans</td><td><span data-challenger-formula="smic_hourly">10 €</span> brut</td></tr></tbody></table>';
    expect(contentToFaqAnswerHtml(html, { smicHourly: 12 })).toMatch(
      /^<p><strong>Âge<\/strong><\/p><ul><li>26 ans : Montant : 12,00\s€ brut<\/li><\/ul>$/
    );
  });

  it("supprime infographies, images et scripts ; garde le texte des balises inconnues", () => {
    expect(
      contentToFaqAnswerHtml(
        '<div class="infographic" data-infographic-id="1"><p>légende</p></div>' +
          '<p>avant <img src="a.png"> <webcomponent-tooltip>mot</webcomponent-tooltip> <span class="x">fin</span></p><script>alert(1)</script>'
      )
    ).toBe("<p>avant mot fin</p>");
  });

  it("échappe le texte", () => {
    expect(contentToFaqAnswerHtml("<p>1 &lt; 2 &amp; 3</p>")).toBe(
      "<p>1 &lt; 2 &amp; 3</p>"
    );
  });

  it("transforme les intertitres span.title / span.sub-title en paragraphe gras", () => {
    expect(
      contentToFaqAnswerHtml(
        '<span class="title">Modalités</span><p>texte</p><span class="sub-title">Détail</span>'
      )
    ).toBe(
      "<p><strong>Modalités</strong></p><p>texte</p><p><strong>Détail</strong></p>"
    );
  });

  it("conserve les espaces entre balises en ligne", () => {
    expect(
      contentToFaqAnswerHtml(
        "<p>le <strong>salarié</strong> <em>doit</em> <strong>agir</strong></p>"
      )
    ).toBe(
      "<p>le <strong>salarié</strong> <em>doit</em> <strong>agir</strong></p>"
    );
  });

  describe("montants challenger", () => {
    const span = (amount: string) =>
      `<p><span data-challenger-formula="smic_hourly">${amount}</span> brut</p>`;
    const options = { smicHourly: 12 };

    it("remplace un montant inférieur au calcul par le montant calculé", () => {
      const out = contentToFaqAnswerHtml(span("10 €"), options);
      expect(out).toMatch(/^<p>12,00\s€ brut<\/p>$/);
    });
    it("conserve un montant saisi supérieur au calcul", () => {
      expect(contentToFaqAnswerHtml(span("20 €"), options)).toBe(
        "<p>20 € brut</p>"
      );
    });
    it("garde le montant saisi sans SMIC connu", () => {
      expect(contentToFaqAnswerHtml(span("10 €"))).toBe("<p>10 € brut</p>");
    });
  });
});
