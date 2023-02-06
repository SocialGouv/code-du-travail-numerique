import { fireEvent, render, screen } from "@testing-library/react";
import { ui } from "./ui";
import { DureePreavisRetraite } from "../index";
import { loadPublicodesRules } from "../../api";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 16,
  "shortTitle": "Transports routiers et activités auxiliaires du transport",
  "id": "KALICONT",
  "title": "Transports routiers et activités auxiliaires du transport",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT",
  "slug": "cc-16"
}
`
);

test(`
 - valider l'affichage de la convention collective dans le détail
`, async () => {
  await render(
    <DureePreavisRetraite
      icon=""
      title=""
      displayTitle=""
      slug={"preavis-retraite"}
    />
  );

  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.origin.mise.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());
  fireEvent.change(ui.information.agreement16.categoryProInput.get(), {
    target: {
      value: "'Ingénieurs et cadres'",
    },
  });
  fireEvent.click(ui.information.handicap.oui.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.seniority.moreThanXYear.oui.get());
  fireEvent.click(ui.next.get());

  const situations = screen.queryAllByTestId("situation-", {
    exact: false,
  });
  expect(situations).toHaveLength(5);
  expect(situations[0]).toHaveTextContent("Convention collective");
  expect(situations[0]).toHaveTextContent(
    "Transports routiers et activités auxiliaires du transport"
  );
  expect(situations[1]).toHaveTextContent("Origine du départ à la retraite");
  expect(situations[1]).toHaveTextContent("Mise à la retraite");
  expect(situations[2]).toHaveTextContent("Catégorie professionnelle");
  expect(situations[2]).toHaveTextContent("Ingénieurs et cadres");
  expect(situations[3]).toHaveTextContent("Travailleur handicapé");
  expect(situations[3]).toHaveTextContent("Oui*");
  expect(situations[4]).toHaveTextContent("Ancienneté du salarié");
  expect(situations[4]).toHaveTextContent("Plus de 2 ans");
  expect(
    screen.queryByText(
      /Le salarié étant reconnu en tant que travailleur handicapé, la durée du préavis de mise à la retraite est doublée mais ne peut pas dépasser un maximum de 3 mois/
    )
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      /Ce résultat tient compte de la majoration pour les travailleurs handicapés./
    )
  ).toBeInTheDocument();

  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.information.handicap.non.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.seniority.moreThanXYear.non.get());
  fireEvent.change(ui.seniority.input.get(), {
    target: {
      value: "12",
    },
  });
  fireEvent.click(ui.next.get());

  const situations2 = screen.queryAllByTestId("situation-", {
    exact: false,
  });
  expect(situations2).toHaveLength(5);
  expect(situations2[0]).toHaveTextContent("Convention collective");
  expect(situations2[0]).toHaveTextContent(
    "Transports routiers et activités auxiliaires du transport"
  );
  expect(situations2[1]).toHaveTextContent("Origine du départ à la retraite");
  expect(situations2[1]).toHaveTextContent("Mise à la retraite");
  expect(situations2[2]).toHaveTextContent("Catégorie professionnelle");
  expect(situations2[2]).toHaveTextContent("Ingénieurs et cadres");
  expect(situations2[3]).toHaveTextContent("Travailleur handicapé");
  expect(situations2[3]).toHaveTextContent("Non");
  expect(situations2[4]).toHaveTextContent("Ancienneté du salarié");
  expect(situations2[4]).toHaveTextContent("12 mois");

  expect(
    screen.queryByText(
      /Le salarié étant reconnu en tant que travailleur handicapé, la durée du préavis de mise à la retraite est doublée mais ne peut pas dépasser un maximum de 3 mois/
    )
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(
      /Ce résultat tient compte de la majoration pour les travailleurs handicapés./
    )
  ).not.toBeInTheDocument();
});
