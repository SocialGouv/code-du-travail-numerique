import React from "react";
import { render } from "@testing-library/react";
import { ElementBuilder } from "../ElementBuilder";

const tests = [
  {
    title: "renders when type is text",
    data: { type: "text", text: "moonshot" },
    test: (container) =>
      expect(container).toMatchInlineSnapshot(`
        <div>
          moonshot
        </div>
      `),
  },
  {
    title: "renders when data is an array",

    data: [
      { type: "text", text: "moonshot 0" },
      { type: "text", text: "moonshot 1" },
    ],
    test: (container) =>
      expect(container).toMatchInlineSnapshot(`
        <div>
          moonshot 0
          moonshot 1
        </div>
      `),
  },
  {
    title: "does not render anything when data is undefined",
    data: undefined,
    test: (container) => expect(container).toMatchInlineSnapshot(`<div />`),
  },
  {
    title: "does not render anything when element name is not recognized",
    data: {
      type: "element",
      name: "TrucMuche",
      attributes: {
        bidule: "ok ?",
      },
      children: [
        { type: "text", text: "you shall not see this text in snapshot !" },
      ],
    },
    test: (container) => expect(container).toMatchInlineSnapshot(`<div />`),
  },
  {
    title: "does render stuff inside a styled block",
    data: [
      {
        type: "element",
        name: "ANoter",
        children: [{ type: "text", text: "stuff 0" }],
      },
      {
        type: "element",
        name: "ASavoir",
        children: [{ type: "text", text: "stuff 1" }],
      },
      {
        type: "element",
        name: "Attention",
        children: [{ type: "text", text: "stuff 2" }],
      },
      {
        type: "element",
        name: "Rappel",
        children: [{ type: "text", text: "stuff 3" }],
      },
    ],
    test: (container) =>
      expect(container).toMatchInlineSnapshot(`
        <div>
          <div
            class="sc-jSFjdj sc-cKRKFl dWteEK hZmRui"
          >
            stuff 0
          </div>
          <div
            class="sc-jSFjdj sc-cKRKFl dWteEK hZmRui"
          >
            stuff 1
          </div>
          <div
            class="sc-jSFjdj sc-cKRKFl dWteEK hZmRui"
          >
            stuff 2
          </div>
          <div
            class="sc-jSFjdj sc-cKRKFl dWteEK hZmRui"
          >
            stuff 3
          </div>
        </div>
      `),
  },
  {
    title: "does render several elements",
    data: [
      {
        type: "element",
        name: "Chapitre",
        children: [{ type: "text", text: "Chapitre" }],
      },
      {
        type: "element",
        name: "SousChapitre",
        children: [{ type: "text", text: "SousChapitre" }],
      },
      {
        type: "element",
        name: "Expression",
        children: [{ type: "text", text: "Expression (inside i)" }],
      },
      {
        type: "element",
        name: "MiseEnEvidence",
        children: [{ type: "text", text: "MiseEnEvidence (inside strong)" }],
      },
      {
        type: "element",
        name: "Valeur",
        children: [{ type: "text", text: "Valeur (inside strong)" }],
      },
      {
        type: "element",
        name: "Paragraphe",
        children: [{ type: "text", text: "Paragraphe (inside p)" }],
      },
      {
        type: "element",
        name: "Exposant",
        children: [{ type: "text", text: "Exposant (inside sup)" }],
      },
      {
        type: "element",
        name: "LienIntra",
        children: [{ type: "text", text: "LienIntra" }],
      },
      {
        type: "element",
        name: "LienInterne",
        children: [{ type: "text", text: "LienInterne" }],
      },
    ],
    test: (container) =>
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
      `),
  },
];

describe("<ElementBuilder />", () => {
  tests.forEach(({ title, data, test }) => {
    it(title, () => {
      const { container } = render(<ElementBuilder data={data} />);
      test(container);
    });
  });
});
