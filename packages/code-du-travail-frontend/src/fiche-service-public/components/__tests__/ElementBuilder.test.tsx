import React from "react";
import { render } from "@testing-library/react";
import {ElementBuilder, FicheSPData} from "../ElementBuilder";

const tests = [
  {
    title: "renders when type is text",
    data: { type: "text", text: "moonshot" },
    test: (container) => expect(container).toMatchSnapshot(),
  },
  {
    title: "renders when data is an array",

    data: [
      { type: "text", text: "moonshot 0" },
      { type: "text", text: "moonshot 1" },
    ],
    test: (container) => expect(container).toMatchSnapshot(),
  },
  {
    title: "does not render anything when data is undefined",
    data: undefined,
    test: (container) => expect(container).toMatchSnapshot(),
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
    test: (container) => expect(container).toMatchSnapshot(),
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
    test: (container) => expect(container).toMatchSnapshot(),
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
    test: (container) => expect(container).toMatchSnapshot(),
  },
];

describe("<ElementBuilder />", () => {
  tests.forEach(({ title, data, test }) => {
    it(title, () => {
      const { container } = render(<ElementBuilder data={data as FicheSPData} />);
      test(container);
    });
  });
});
