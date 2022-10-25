import { getServerSideProps } from "../../../../pages/outils/[slug]";

import { CalculateurIndemnite } from "..";
import { ui } from "./ui";

import { fireEvent, render, waitFor } from "@testing-library/react";

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
  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.contract.type.cdi.get());
  fireEvent.click(ui.contract.fauteGrave.non.get());
  fireEvent.click(ui.contract.inaptitude.non.get());
  fireEvent.click(ui.next.get());

  // Vérifier la recherche par cc
  fireEvent.click(ui.agreement.agreement.get());
  fireEvent.change(ui.agreement.agreementInput.get(), {
    target: { value: "16" },
  });
  await waitFor(() =>
    fireEvent.click(ui.agreement.searchItem.agreement16.get())
  );
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.previous.get());
  expect(ui.agreement.agreementInputConfirm.get()).toBeInTheDocument();
  expect(ui.agreement.searchItem.agreement16.get()).toBeInTheDocument();

  // Vérifier la recherche par entreprise
  fireEvent.click(ui.agreement.unknownAgreement.get());
  expect(ui.agreement.agreementCompanyInputAsk.get()).toBeInTheDocument();
  expect(ui.agreement.agreementCompanyInput.get()).toBeInTheDocument();
  expect(ui.agreement.agreementPostalCodeInput.get()).toBeInTheDocument();
  fireEvent.change(ui.agreement.agreementCompanyInput.get(), {
    target: { value: "carrefour" },
  });
  await waitFor(() => {
    fireEvent.click(ui.agreement.searchItem.carrefour.get());
  });
  expect(ui.agreement.agreementCompanyInputConfirm.get()).toBeInTheDocument();
  expect(ui.agreement.ccChoice.commerce.get()).toBeInTheDocument();
  expect(ui.agreement.ccChoice.bureau.get()).toBeInTheDocument();
  fireEvent.click(ui.agreement.ccChoice.commerce.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.previous.get());
  expect(ui.agreement.agreementCompanyInputConfirm.get()).toBeInTheDocument();
  expect(ui.agreement.searchItem.carrefour.get()).toBeInTheDocument();

  // Vérifier la non sélection d'une cc
  fireEvent.click(ui.agreement.noAgreement.get());
  expect(ui.warning.get()).toBeInTheDocument();
});
