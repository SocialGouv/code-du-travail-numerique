import React from "react";
import { render } from "react-testing-library";
import { ElementBuilder } from "../ElementBuilder";

const tests = [
  {
    title: "renders when type is text",
    data: { type: "text", $: "moonshot" },
    test: container =>
      expect(container).toMatchInlineSnapshot(`
<div>
  moonshot
</div>
`)
  },
  {
    title: "renders when data is an array",

    data: [
      { type: "text", $: "moonshot 0" },
      { type: "text", $: "moonshot 1" }
    ],
    test: container =>
      expect(container).toMatchInlineSnapshot(`
<div>
  moonshot 0
  moonshot 1
</div>
`)
  },
  {
    title: "does not render anything when data is undefined",
    data: undefined,
    test: container => expect(container).toMatchInlineSnapshot(`<div />`)
  },
  {
    title: "does not render anything when element name is not recognized",
    data: {
      type: "element",
      name: "TrucMuche",
      _: {
        bidule: "ok ?"
      },
      $: [{ type: "text", $: "you shall not see this text in snapshot !" }]
    },
    test: container => expect(container).toMatchInlineSnapshot(`<div />`)
  },
  {
    title: "does render stuff inside a styled block",
    data: [
      {
        type: "element",
        name: "ANoter",
        $: [{ type: "text", $: "stuff 0" }]
      },
      {
        type: "element",
        name: "ASavoir",
        $: [{ type: "text", $: "stuff 1" }]
      },
      {
        type: "element",
        name: "Attention",
        $: [{ type: "text", $: "stuff 2" }]
      },
      {
        type: "element",
        name: "Rappel",
        $: [{ type: "text", $: "stuff 3" }]
      }
    ],
    test: container =>
      expect(container).toMatchInlineSnapshot(`
.c0 {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 0.25rem;
}

.c0 > *:first-child {
  margin-top: 0;
}

.c0 > *:last-child {
  margin-bottom: 0;
}

<div>
  <div
    class="c0"
  >
    stuff 0
  </div>
  <div
    class="c0"
  >
    stuff 1
  </div>
  <div
    class="c0"
  >
    stuff 2
  </div>
  <div
    class="c0"
  >
    stuff 3
  </div>
</div>
`)
  },
  {
    title: "does render several elements",
    data: [
      {
        type: "element",
        name: "Chapitre",
        $: [{ type: "text", $: "Chapitre" }]
      },
      {
        type: "element",
        name: "SousChapitre",
        $: [{ type: "text", $: "SousChapitre" }]
      },
      {
        type: "element",
        name: "Expression",
        $: [{ type: "text", $: "Expression (inside i)" }]
      },
      {
        type: "element",
        name: "MiseEnEvidence",
        $: [{ type: "text", $: "MiseEnEvidence (inside strong)" }]
      },
      {
        type: "element",
        name: "Valeur",
        $: [{ type: "text", $: "Valeur (inside strong)" }]
      },
      {
        type: "element",
        name: "Paragraphe",
        $: [{ type: "text", $: "Paragraphe (inside p)" }]
      },
      {
        type: "element",
        name: "Exposant",
        $: [{ type: "text", $: "Exposant (inside sup)" }]
      },
      {
        type: "element",
        name: "LienIntra",
        $: [{ type: "text", $: "LienIntra" }]
      },
      {
        type: "element",
        name: "LienInterne",
        $: [{ type: "text", $: "LienInterne" }]
      }
    ],
    test: container =>
      expect(container).toMatchInlineSnapshot(`
<div>
  Chapitre
  SousChapitre
  <i>
    Expression (inside i)
  </i>
  <strong>
    MiseEnEvidence (inside strong)
  </strong>
  <strong>
    Valeur (inside strong)
  </strong>
  <p>
    Paragraphe (inside p)
  </p>
  <sup>
    Exposant (inside sup)
  </sup>
  LienIntra
  LienInterne
</div>
`)
  }
];

describe("<ElementBuilder />", () => {
  tests.forEach(({ title, data, test }) => {
    it(title, () => {
      const { container } = render(<ElementBuilder data={data} />);
      test(container);
    });
  });
});
