import { getServerSideProps } from "../../../../pages/outils/[slug]";

import { CalculateurIndemnite } from "..";

import { render, fireEvent, screen, waitFor } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve({
        relatedItems: [],
        entreprises: [
          {
            activitePrincipale:
              "Commerce de détail en magasin non spécialisé à prédominance alimentaire",
            activitePrincipaleUniteLegale: "47.11F",
            allMatchingEtablissements: [],
            caractereEmployeurUniteLegale: "O",
            categorieJuridiqueUniteLegale: "5710",
            conventions: [
              {
                num: 2216,
                shortTitle:
                  "Commerce de détail et de gros à prédominance alimentaire",
                id: "KALICONT000005635085",
                title:
                  "Commerce de détail et de gros à prédominance alimentaire",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
                slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
              },
              {
                num: 1486,
                shortTitle:
                  "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
                id: "KALICONT000005635173",
                title:
                  "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173",
                slug: "1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de",
              },
            ],
            dateCreationUniteLegale: "2006-01-10",
            dateDebut: "2022-04-01",
            etablissements: 228,
            etatAdministratifUniteLegale: "A",
            firstMatchingEtablissement: {
              activitePrincipaleEtablissement: "47.11F",
              address:
                "CENTRE COMMERCIAL VALENTIN AUX TETES 25480 ECOLE-VALENTIN",
              categorieEntreprise: "GE",
              codeCommuneEtablissement: "25212",
              codePostalEtablissement: "25480",
              etablissementSiege: false,
              etatAdministratifEtablissement: "A",
              idccs: ["2216"],
              libelleCommuneEtablissement: "ECOLE-VALENTIN",
              siret: "45132133501187",
            },
            highlightLabel:
              "<b><u>CARREFOUR</u></b> HYPERMARCHES <b><u>CARREOUR</u></b>",
            label: "CARREFOUR HYPERMARCHES CARREOUR",
            matching: 155,
            simpleLabel: "CARREFOUR HYPERMARCHES",
            siren: "451321335",
          },
        ],
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
      });
    },
  })
) as jest.Mock;

test(`
  - Vérifier la recherche par cc
  - Vérifier la recherche par entreprise
  - Vérifier la non sélection d'une cc
`, async () => {
  // @ts-ignore
  const { props }: Props = await getServerSideProps({
    query: { slug: "indemnite-licenciement" },
  });
  await render(<CalculateurIndemnite {...props} />);
  fireEvent.click(screen.queryByText("Commencer") as HTMLElement);
  fireEvent.click(
    screen.queryByText("Contrat à durée indeterminé (CDI)") as HTMLElement
  );
  fireEvent.click(screen.queryAllByText("Non")[0]);
  fireEvent.click(screen.queryAllByText("Non")[1]);
  fireEvent.click(screen.queryByText("Suivant") as HTMLElement);

  // Vérifier la recherche par cc
  expect(
    screen.queryByText(
      "Quel est le nom de la convention collective applicable ?"
    )
  ).toBeInTheDocument();
  fireEvent.click(
    screen.queryByText(
      "Je sais quelle est ma convention collective (je la saisis)"
    ) as HTMLElement
  );
  expect(
    screen.queryByText("Précisez et sélectionnez votre convention collective")
  ).toBeInTheDocument();
  expect(screen.getByTestId("input-agreement")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("input-agreement"), {
    target: { value: "16" },
  });
  waitFor(() =>
    expect(
      screen.queryByText(
        "Transports routiers et activités auxiliaires du transport"
      )
    ).toBeInTheDocument()
  );
  await waitFor(() =>
    fireEvent.click(
      screen.queryByText(
        "Transports routiers et activités auxiliaires du transport"
      ) as HTMLElement
    )
  );
  expect(
    screen.queryByText(/Vous avez sélectionné la convention collective :/)
  ).toBeInTheDocument();

  // Vérifier la recherche par entreprise
  fireEvent.click(
    screen.queryByText(
      "Je ne sais pas quelle est ma convention collective (je la recherche)"
    ) as HTMLElement
  );
  expect(
    screen.queryByText("Précisez et sélectionnez votre entreprise")
  ).toBeInTheDocument();
  expect(screen.getByTestId("input-search-company")).toBeInTheDocument();
  expect(screen.getByTestId("input-search-postal-code")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("input-search-company"), {
    target: { value: "carrefour" },
  });
  await waitFor(() =>
    expect(screen.queryByText("CARREFOUR HYPERMARCHES")).toBeInTheDocument()
  );
  await waitFor(() =>
    fireEvent.click(screen.queryByText("CARREFOUR HYPERMARCHES") as HTMLElement)
  );
  expect(
    screen.queryByText(/Vous avez sélectionné l'entreprise :/)
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
    )
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils (IDCC 1486)"
    )
  ).toBeInTheDocument();
  fireEvent.click(
    screen.queryByText(
      "Commerce de détail et de gros à prédominance alimentaire (IDCC 2216)"
    ) as HTMLElement
  );
  fireEvent.click(screen.queryByText("Suivant") as HTMLElement);
  fireEvent.click(screen.queryByText("Précédent") as HTMLElement);
  expect(
    screen.queryByText(/Vous avez sélectionné la convention collective :/)
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Commerce de détail et de gros à prédominance alimentaire"
    )
  ).toBeInTheDocument();

  // Vérifier la non sélection d'une cc
  fireEvent.click(
    screen.queryByText(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)"
    ) as HTMLElement
  );
  expect(screen.queryByText("Attention")).toBeInTheDocument();
  // fireEvent.click(screen.queryByText("Suivant") as HTMLElement);
  // fireEvent.click(screen.queryByText("Précédent") as HTMLElement);
  // expect(
  //   screen.queryByText("Précisez et sélectionnez votre convention collective")
  // ).toBeInTheDocument();
});
