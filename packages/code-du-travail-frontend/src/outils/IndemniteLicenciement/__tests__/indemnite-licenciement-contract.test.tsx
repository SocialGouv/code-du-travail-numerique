import { getServerSideProps } from "../../../../pages/outils/[slug]";

import { CalculateurIndemnite } from "..";

import { render, fireEvent, screen } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ relatedItems: [] }),
  })
) as jest.Mock;

test(`
  - Vérifier l'affichage de l'intro
  - Vérifier l'affichage des questions de contrat
  - Vérifier les bulles d'info
`, async () => {
  // @ts-ignore
  const { props }: Props = await getServerSideProps({
    query: { slug: "indemnite-licenciement" },
  });
  await render(<CalculateurIndemnite {...props} />);

  // Vérifier l'affichage de l'intro
  expect(
    screen.queryByText("Calculer l'indemnité de licenciement")
  ).toBeInTheDocument();
  expect(screen.queryByText("Commencer")).toBeInTheDocument();
  await fireEvent.click(screen.queryByText("Commencer") as HTMLElement);

  // Vérifier l'affichage des questions de contrat
  expect(
    screen.queryByText("Quel est le type du contrat de travail ?")
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Contrat à durée determiné (CDD) ou contrat d’intérim")
  ).toBeInTheDocument();
  expect(
    screen.queryByText("Contrat à durée indeterminé (CDI)")
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Le licenciement est-il dû à une faute grave (ou lourde) ?"
    )
  ).toBeInTheDocument();
  expect(screen.queryAllByText("Oui")[0]).toBeInTheDocument();
  expect(screen.queryAllByText("Non")[0]).toBeInTheDocument();
  expect(
    screen.queryByText(
      "Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue ?"
    )
  ).toBeInTheDocument();
  expect(screen.queryAllByText("Oui")[1]).toBeInTheDocument();
  expect(screen.queryAllByText("Non")[1]).toBeInTheDocument();

  // Vérifier l'affichage des bulles d'info
  await fireEvent.click(
    screen.queryByText(
      "Contrat à durée determiné (CDD) ou contrat d’intérim"
    ) as HTMLElement
  );
  expect(
    screen.queryByText("indemnité de précarité (nouvelle fenêtre)")
  ).toBeInTheDocument();
  await fireEvent.click(
    screen.queryByText("Contrat à durée indeterminé (CDI)") as HTMLElement
  );
  expect(
    screen.queryByText("indemnité de précarité (nouvelle fenêtre)")
  ).not.toBeInTheDocument();
  await fireEvent.click(screen.queryAllByText("Oui")[0]);
  expect(
    screen.queryByText(
      "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
    )
  ).toBeInTheDocument();
  await fireEvent.click(screen.queryAllByText("Non")[0]);
  expect(
    screen.queryByText(
      "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
    )
  ).not.toBeInTheDocument();
});
