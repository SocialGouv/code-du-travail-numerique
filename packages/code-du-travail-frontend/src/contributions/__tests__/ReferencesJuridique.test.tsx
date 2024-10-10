import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";
import { ReferencesJuridiques } from "../References";

describe("ReferencesJuridiques", () => {
  it(`doit retourner null si pas de références`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques references={[]}></ReferencesJuridiques>
    );

    expect(asFragment().firstChild).toBeNull();
  });
  it(`doit mettre les références sans lien à la fin`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques
        references={
          [
            {
              url: null,
              title: "Titre 1",
            },
            {
              title: "Titre 2",
              url: "http://lien2",
            },
            {
              url: undefined,
              title: "Titre 3",
            },
            {
              title: "Titre 4",
            },
            {
              title: "Titre 5",
              url: "http://lien4",
            },
          ] as any
        }
      ></ReferencesJuridiques>
    );

    expect(asFragment().firstChild).toMatchSnapshot();
  });
});
