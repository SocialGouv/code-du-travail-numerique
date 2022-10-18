import {
  default as Outils,
  getServerSideProps,
} from "../../../pages/outils/[slug]";

import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        relatedItems: [],
        hits: {
          hits: [
            {
              _source: {
                num: 16,
                shortTitle:
                  "Transports routiers et activités auxiliaires du transport",
                id: "KALICONT000005635624",
                title:
                  "Transports routiers et activités auxiliaires du transport",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
                slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
              },
            },
          ],
        },
      }),
  })
) as jest.Mock;

jest.spyOn(Storage.prototype, "setItem");
jest.spyOn(Storage.prototype, "getItem");

describe("indemnite-licenciement", () => {
  let rendering: RenderResult;
  test(`
    - Vérifier l'affichage de la question cc
    - Vérifier l'affichage de la recherche
  `, async () => {
    //@ts-ignore
    const result: any = await getServerSideProps({
      query: { slug: "indemnite-licenciement" },
    });
    const props = result.props;
    rendering = await render(<Outils {...props} />);
    await fireEvent.click(rendering?.queryByText("Commencer") as HTMLElement);
    await fireEvent.click(
      rendering.queryByText("Contrat à durée indeterminé (CDI)") as HTMLElement
    );
    await fireEvent.click(rendering.queryAllByText("Non")[0] as HTMLElement);
    await fireEvent.click(rendering.queryAllByText("Non")[1] as HTMLElement);
    await fireEvent.click(rendering.queryByText("Suivant") as HTMLElement);

    // Vérifier l'affichage de la question cc
    expect(
      rendering.queryByText(
        "Quel est le nom de la convention collective applicable ?"
      )
    ).toBeInTheDocument();

    // Vérifier l'affichage de la recherche
    await fireEvent.click(
      rendering.queryByText(
        "Je sais quelle est ma convention collective (je la saisis)"
      ) as HTMLElement
    );
    expect(
      rendering.queryByText(
        "Précisez et sélectionnez votre convention collective"
      )
    ).toBeInTheDocument();
    expect(rendering.getByTestId("input-agreement")).toBeInTheDocument();
    await fireEvent.change(rendering.getByTestId("input-agreement"), {
      target: { value: "1" },
    });
    await waitFor(async () =>
      expect(
        rendering.queryByText(
          "Transports routiers et activités auxiliaires du transport"
        )
      ).toBeInTheDocument()
    );
    fireEvent.click(
      rendering.queryByText(
        "Transports routiers et activités auxiliaires du transport"
      ) as HTMLElement
    );
    expect(
      rendering.queryByText(/Vous avez sélectionné la convention collective/)
    ).toBeInTheDocument();
  });
});
