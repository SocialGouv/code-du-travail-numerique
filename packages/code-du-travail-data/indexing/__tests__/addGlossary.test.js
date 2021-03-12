import { create } from "../glossary";

const glossaryTerms = [
  {
    definition: "Contenu tooltip.",
    term: "term1",
    variants: ["term111"],
  },
  {
    tagName: "tag-veryspecial",
    term: "veryspecial",
  },
  {
    term: "accord de branche",
  },
];

const glossary = create(glossaryTerms);

describe("glossary.replaceHtml", () => {
  test("should replace in HTML content", () => {
    const content = `<p>some <b>HTML</b> with <a href="#">term1</a> and its variant term111</p>`;
    expect(glossary.replaceHtml(content)).toEqual(
      `<p>some <b>HTML</b> with <a href="#"><span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span></a> and its variant<span> <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip></span></p>`
    );
  });

  test("should replace in loose HTML content", () => {
    const content = `<p>some <b>HTML</b> with <a href="#">term1</a> and its variant term111 also`;
    expect(glossary.replaceHtml(content)).toEqual(
      `<p>some <b>HTML</b> with <a href="#"><span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span></a> and its variant<span> <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip> </span>also</p>`
    );
  });

  test("should replace in starting words", () => {
    const content = `term1 is here`;
    expect(glossary.replaceHtml(content)).toEqual(
      `<span><webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip> </span>is here`
    );
  });

  test("should replace in ending words", () => {
    const content = `now there term1`;
    expect(glossary.replaceHtml(content)).toEqual(
      `now there<span> <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></span>`
    );
  });

  test("should replace in nested HTML", () => {
    const content = `now <div><ul>
<li>Term1 inside some list</li<
</ul></div>`;
    expect(glossary.replaceHtml(content)).toEqual(
      `now <div><ul>
<li><span><webcomponent-tooltip content="Contenu%20tooltip.">Term1</webcomponent-tooltip> </span>inside some list</li></ul></div>`
    );
  });

  test("should NOT replace in attribute", () => {
    const content = `now <div title="some term1">hello</div>`;
    expect(glossary.replaceHtml(content)).toEqual(
      `now <div title="some term1">hello</div>`
    );
  });

  test("should NOT replace in tagname", () => {
    const content = `now <term1>hello</term1>`;
    expect(glossary.replaceHtml(content)).toEqual(`now <term1>hello</term1>`);
  });

  test("should NOT replace partial word", () => {
    const content = `now term1é`;
    expect(glossary.replaceHtml(content)).toEqual(`now term1é`);
  });

  test("should use custom tagName", () => {
    const content = `now for some veryspecial term`;
    expect(glossary.replaceHtml(content)).toEqual(
      `now for some<span> <tag-veryspecial>veryspecial</tag-veryspecial> </span>term`
    );
  });

  test("should not HTML encode &nbsp;", () => {
    const content = `<p>La démission&nbsp;</p>`;
    expect(glossary.replaceHtml(content)).toEqual(`<p>La démission&nbsp;</p>`);
  });
});

describe("glossary.replaceMarkdown", () => {
  test("should replace in Markdown content", () => {
    const content = `# Hello term1

    Some content with *term1* and term111`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `# Hello <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>

Some content with *<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>* and <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip>`
    );
  });

  test("should replace in starting words", () => {
    const content = `term1 is here`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip> is here`
    );
  });

  test("should replace in ending words", () => {
    const content = `now there term1`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `now there <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>`
    );
  });

  test("should replace in quotes", () => {
    const content = `now is "term1"`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `now is "<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>"`
    );
  });

  test("should replace with apos", () => {
    const content = `now is l'term1`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `now is l'<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>`
    );
  });

  test("should replace with perentheses", () => {
    const content = `now is (term1)`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `now is (<webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>)`
    );
  });

  test("should replace in MDX content", () => {
    const content = `<Tab>
<Title>some title term1</Title>
</Tab>

> And now some term111 text
`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `<Tab>

<Title>some title <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip></Title>

</Tab>

> And now some <webcomponent-tooltip content="Contenu%20tooltip.">term111</webcomponent-tooltip> text`
    );
  });

  test("should use custom tagName", () => {
    const content = `# now for some __veryspecial__ term`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `# now for some **<tag-veryspecial>veryspecial</tag-veryspecial>** term`
    );
  });

  test("should handle complex markdown", () => {
    const content = `Some text

<Tab>

<HDN>

Some content

- entry 1
- term1
- entry 3

</HDN>

</Tab>`;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `Some text

<Tab>

<HDN>

Some content

- entry 1
- <webcomponent-tooltip content="Contenu%20tooltip.">term1</webcomponent-tooltip>
- entry 3

</HDN>

</Tab>`
    );
  });

  test("should handle complex markdown 2", () => {
    const content = `Le code du travail prévoit la durée maximale de la période d’essai. Il précise que, dans certains cas, la période d’essai est automatiquement réduite ou supprimée.

#### 1. Conditions de réduction ou suppression de la période d'essai

En effet, après la fin du contrat d’apprentissage, il ne peut pas y avoir de période d’essai en cas d’embauche en CDI, CDD ou contrat de mission (intérim), sauf si une convention collective ou un accord d’entreprise en prévoit une.

La durée de la période d’essai normalement prévue est automatiquement réduite dans les cas suivants :

- En cas de poursuite du contrat de travail en CDI après la fin d’un CDD, la durée du CDD est déduite de la période d’essai du CDI ;
- En cas d’embauche après la fin du contrat de mission (intérim), la durée des missions effectuées par le salarié dans l'entreprise au cours des 3 mois précédant l'embauche est déduite de la période d'essai ;
- En cas d'embauche dans les 3 mois après un stage intégré à un cursus pédagogique réalisé lors de la dernière année d'études, la durée de ce stage est déduite de la période d'essai. Celle-ci ne peut pas être réduite de plus de la moitié, sauf si un accord collectif prévoit des mesures plus favorables. Si cette embauche est effectuée dans un emploi correspondant avec les activités confiées au stagiaire, la durée du stage est déduite intégralement de la période d'essai.

#### 2. Durées de la période d'essai

La durée de la période d'essai varie selon le type de contrat de travail.

<Tab title="CDI">

La période d’essai, appelée période d’essai initiale, peut être renouvelée une fois. Sa durée maximale varie en fonction de la catégorie professionnelle du salarié.

- Ouvriers et Employés :

  - Durée de la période d’essai initiale : 2 mois ;
  - Durée totale de la période d’essai avec renouvellement : 4 mois.

  - Agents de maîtrise :
  - Durée de la période d’essai initiale : 3 mois ;
  - Durée totale de la période d’essai avec renouvellement : 6 mois.

  - Cadres :
  - Durée de la période d’essai initiale : 4 mois ;
  - Durée totale de la période d’essai avec renouvellement : 8 mois.

  <HDN>

Si une convention et/ ou un accord collectif d'entreprise prévoi(en)t des durées différentes, l’employeur et le salarié appliquent :

- La durée de la période d’essai prévue par la convention ou l'accord de branche conclu avant le 26 juin 2008, si cette durée est plus longue que celle prévue par le code du travail ;

  ou

  - La durée de la période d’essai initiale de l’accord d’entreprise, si elle est plus longue que celle prévue par une convention ou un accord de branche et plus courte que celle prévue par le code du travail, pour les contrats de travail conclus depuis le 1er janvier 2018.

L'employeur et le salarié peuvent toujours fixer, dans le contrat de travail, une durée plus courte, qui s'appliquera.

</HDN>

</Tab>

<Tab title="CDD">

La durée de la période d’essai dépend de la durée du CDD. Si le CDD n’a pas de terme précis, la durée de la période d’essai est fixée par rapport à la durée minimale du CDD.

- CDD de 6 mois maximum : 1 jour par semaine de travail, sans dépasser 2 semaines de période d’essai ;
- CDD de plus de 6 mois : 1 mois maximum.

<HDN>

Si une convention ou un accord collectif de branche ou d’entreprise prévoit une durée différente de celle prévue par le code du travail, l'employeur et le salarié appliquent la durée la plus courte.

Le contrat de travail peut toujours prévoir une durée de période d'essai plus courte, qui s’appliquera.

</HDN>

</Tab>`;

    expect(glossary.replaceMarkdown(content)).toEqual(
      `Le code du travail prévoit la durée maximale de la période d’essai. Il précise que, dans certains cas, la période d’essai est automatiquement réduite ou supprimée.

#### 1. Conditions de réduction ou suppression de la période d'essai

En effet, après la fin du contrat d’apprentissage, il ne peut pas y avoir de période d’essai en cas d’embauche en CDI, CDD ou contrat de mission (intérim), sauf si une convention collective ou un accord d’entreprise en prévoit une.

La durée de la période d’essai normalement prévue est automatiquement réduite dans les cas suivants :

- En cas de poursuite du contrat de travail en CDI après la fin d’un CDD, la durée du CDD est déduite de la période d’essai du CDI ;
- En cas d’embauche après la fin du contrat de mission (intérim), la durée des missions effectuées par le salarié dans l'entreprise au cours des 3 mois précédant l'embauche est déduite de la période d'essai ;
- En cas d'embauche dans les 3 mois après un stage intégré à un cursus pédagogique réalisé lors de la dernière année d'études, la durée de ce stage est déduite de la période d'essai. Celle-ci ne peut pas être réduite de plus de la moitié, sauf si un accord collectif prévoit des mesures plus favorables. Si cette embauche est effectuée dans un emploi correspondant avec les activités confiées au stagiaire, la durée du stage est déduite intégralement de la période d'essai.

#### 2. Durées de la période d'essai

La durée de la période d'essai varie selon le type de contrat de travail.

<Tab title="CDI">

La période d’essai, appelée période d’essai initiale, peut être renouvelée une fois. Sa durée maximale varie en fonction de la catégorie professionnelle du salarié.

- Ouvriers et Employés :

  - Durée de la période d’essai initiale : 2 mois ;

  - Durée totale de la période d’essai avec renouvellement : 4 mois.

  - Agents de maîtrise :

  - Durée de la période d’essai initiale : 3 mois ;

  - Durée totale de la période d’essai avec renouvellement : 6 mois.

  - Cadres :

  - Durée de la période d’essai initiale : 4 mois ;

  - Durée totale de la période d’essai avec renouvellement : 8 mois.

<HDN>

Si une convention et/ ou un accord collectif d'entreprise prévoi(en)t des durées différentes, l’employeur et le salarié appliquent :

- La durée de la période d’essai prévue par la convention ou l'<webcomponent-tooltip>accord de branche</webcomponent-tooltip> conclu avant le 26 juin 2008, si cette durée est plus longue que celle prévue par le code du travail ;

  ou

  - La durée de la période d’essai initiale de l’accord d’entreprise, si elle est plus longue que celle prévue par une convention ou un <webcomponent-tooltip>accord de branche</webcomponent-tooltip> et plus courte que celle prévue par le code du travail, pour les contrats de travail conclus depuis le 1er janvier 2018.

L'employeur et le salarié peuvent toujours fixer, dans le contrat de travail, une durée plus courte, qui s'appliquera.

</HDN>

</Tab>

<Tab title="CDD">

La durée de la période d’essai dépend de la durée du CDD. Si le CDD n’a pas de terme précis, la durée de la période d’essai est fixée par rapport à la durée minimale du CDD.

- CDD de 6 mois maximum : 1 jour par semaine de travail, sans dépasser 2 semaines de période d’essai ;
- CDD de plus de 6 mois : 1 mois maximum.

<HDN>

Si une convention ou un accord collectif de branche ou d’entreprise prévoit une durée différente de celle prévue par le code du travail, l'employeur et le salarié appliquent la durée la plus courte.

Le contrat de travail peut toujours prévoir une durée de période d'essai plus courte, qui s’appliquera.

</HDN>

</Tab>`
    );
  });

  test("should accept malformed MDX", () => {
    const content = `# some MDX

<Tab>

  <Tab>

  - item 1

    Or

    - item veryspecial

  </Tab>

</Tab>

 `;
    expect(glossary.replaceMarkdown(content)).toEqual(
      `# some MDX

<Tab>

<Tab>

- item 1

  Or

  - item <tag-veryspecial>veryspecial</tag-veryspecial>

</Tab>

</Tab>`
    );
  });
});
