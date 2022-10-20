import { DureePreavisDemission } from "..";

import { render, fireEvent, screen, waitFor } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve({
        relatedItems: [],
        hits: {
          hits: [
            {
              _index: "cdtn-preprod-v2_documents-1666187726633",
              _type: "_doc",
              _id: "bc3a2485c3",
              _score: 72.69442,
              _source: {
                effectif: 160768,
                cdtnId: "bc3a2485c3",
                num: 1351,
                shortTitle: "Entreprises de prévention et de sécurité",
                id: "KALICONT000005635405",
                title: "Entreprises de prévention et de sécurité",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635405",
                slug: "1351-entreprises-de-prevention-et-de-securite",
              },
            },
          ],
        },
      });
    },
  })
) as jest.Mock;

// TODO test customized cc
test(`
  - Vérifier l'affichage de la cc 1351
`, async () => {
  await render(<DureePreavisDemission icon="" title="" displayTitle="" />);

  fireEvent.click(screen.queryByText("Commencer") as HTMLElement);
  fireEvent.click(
    screen.queryByText(
      "Je sais quelle est ma convention collective (je la saisis)"
    ) as HTMLElement
  );
  expect(screen.queryByTestId("input-agreement")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("input-agreement"), {
    target: { value: "1351" },
  });
  await waitFor(() =>
    expect(
      screen.queryByText("Entreprises de prévention et de sécurité")
    ).toBeInTheDocument()
  );
  fireEvent.click(
    screen.queryByText(
      "Entreprises de prévention et de sécurité"
    ) as HTMLElement
  );
  fireEvent.click(screen.queryByText("Suivant") as HTMLElement);
  expect(
    screen.queryByText("Quelle est la catégorie professionnelle du salarié ?")
  ).toBeInTheDocument();
  fireEvent.click(
    screen.queryByTestId("criteria.catégorie professionnelle") as HTMLElement
  );
  expect(
    screen.queryByTestId("criteria.catégorie professionnelle")
  ).toBeInTheDocument();
  fireEvent.change(
    screen.queryByTestId("criteria.catégorie professionnelle") as HTMLElement,
    {
      target: {
        value:
          "20| Agents d'exploitation, employés administratifs et techniciens",
      },
    }
  );
  expect(
    screen.queryByText(
      "Agents d'exploitation, employés administratifs et techniciens"
    )
  ).toBeInTheDocument();
  expect(screen.queryByText("Agents de maîtrise")).toBeInTheDocument();
  expect(screen.queryByText("Cadres")).toBeInTheDocument();
  expect(screen.queryByTestId("criteria.niveau")).toBeInTheDocument();
  fireEvent.change(screen.queryByTestId("criteria.niveau") as HTMLElement, {
    target: { value: "1| I" },
  });
  expect(screen.queryByText("I")).toBeInTheDocument();
  expect(screen.queryByText("II")).toBeInTheDocument();
  expect(screen.queryByText("III")).toBeInTheDocument();
  expect(screen.queryByText("IV")).toBeInTheDocument();
  expect(screen.queryByText("V")).toBeInTheDocument();
  expect(screen.queryByTestId("criteria.ancienneté")).toBeInTheDocument();
  fireEvent.change(screen.queryByTestId("criteria.ancienneté") as HTMLElement, {
    target: { value: "1| Moins de 15 jours" },
  });
  expect(screen.queryByText("Moins de 15 jours")).toBeInTheDocument();
  expect(screen.queryByText("15 jours à 1 mois")).toBeInTheDocument();
  expect(screen.queryByText("Plus de 1 mois à 2 mois")).toBeInTheDocument();
  expect(screen.queryByText("Plus de 2 mois à 6 mois")).toBeInTheDocument();
  expect(screen.queryByText("Plus de 6 mois à 2 ans")).toBeInTheDocument();
  expect(screen.queryByText("Plus de 2 ans")).toBeInTheDocument();
  fireEvent.click(screen.queryByText("Suivant") as HTMLElement);
  expect(screen.queryByText("Imprimer le résultat")).toBeInTheDocument();
});
