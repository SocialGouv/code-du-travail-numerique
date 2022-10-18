import {
  default as Outils,
  getServerSideProps,
} from "../../../pages/outils/[slug]";

import { render, fireEvent, RenderResult } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ relatedItems: [] }),
  })
) as jest.Mock;

describe("indemnite-licenciement", () => {
  let rendering: RenderResult;
  beforeAll(async () => {
    //@ts-ignore
    const result: any = await getServerSideProps({
      query: { slug: "indemnite-licenciement" },
    });
    const props = result.props;
    rendering = await render(<Outils {...props} />);
  });
  test(`
    - Vérifier l'affichage de l'intro
    - Vérifier l'affichage de la partie contrat
    - Vérifier l'ouverture des tooltips de la partie contrat
  `, async () => {
    // Vérifier l'affichage de l'intro
    expect(
      rendering.queryByText("Calculer l'indemnité de licenciement")
    ).toBeInTheDocument();
    expect(rendering.queryByText("Commencer")).toBeInTheDocument();

    // Vérifier l'affichage de la partie contrat
    await fireEvent.click(rendering.queryByText("Commencer") as HTMLElement);
    expect(
      rendering.queryByText("Quel est le type du contrat de travail ?")
    ).toBeInTheDocument();
    expect(
      rendering.queryByText(
        "Contrat à durée determiné (CDD) ou contrat d’intérim"
      )
    ).toBeInTheDocument();
    expect(
      rendering.queryByText("Contrat à durée indeterminé (CDI)")
    ).toBeInTheDocument();
    expect(
      rendering.queryByText(
        "Le licenciement est-il dû à une faute grave (ou lourde) ?"
      )
    ).toBeInTheDocument();
    expect(rendering.queryAllByText("Oui")[0]).toBeInTheDocument();
    expect(rendering.queryAllByText("Non")[0]).toBeInTheDocument();
    expect(
      rendering.queryByText(
        "Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue ?"
      )
    ).toBeInTheDocument();
    expect(rendering.queryAllByText("Oui")[1]).toBeInTheDocument();
    expect(rendering.queryAllByText("Non")[1]).toBeInTheDocument();

    // Vérifier l'ouverture des tooltips de la partie contrat
    await fireEvent.click(
      rendering.queryByText(
        "Contrat à durée determiné (CDD) ou contrat d’intérim"
      ) as HTMLElement
    );
    expect(
      rendering.queryByText("indemnité de précarité (nouvelle fenêtre)")
    ).toBeInTheDocument();
    await fireEvent.click(
      rendering.queryByText("Contrat à durée indeterminé (CDI)") as HTMLElement
    );
    expect(
      rendering.queryByText("indemnité de précarité (nouvelle fenêtre)")
    ).not.toBeInTheDocument();
    await fireEvent.click(rendering.queryAllByText("Oui")[0]);
    expect(
      rendering.queryByText(
        "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
      )
    ).toBeInTheDocument();
    await fireEvent.click(rendering.queryAllByText("Non")[0]);
    expect(
      rendering.queryByText(
        "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
      )
    ).not.toBeInTheDocument();
  });
});
