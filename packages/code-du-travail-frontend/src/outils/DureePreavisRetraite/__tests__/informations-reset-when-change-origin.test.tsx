import { fireEvent, render } from "@testing-library/react";
import { ui } from "./ui";
import { DureePreavisRetraite } from "../index";
import { loadPublicodesRules } from "../../api";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 1517,
  "shortTitle": "CC 1517",
  "id": "KALICONT",
  "title": "CC 1517",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT",
  "slug": "cc-1517"
}
`
);

test(`
 - valider quand on change de mise à la retraite à départ à la retraite pour la CC 1517, on ne doit plus afficher la question sur la catégorie pro
 - valider quand on change de mise à la retraite à départ à la retraite pour la CC 1517, on laisse afficher la question sur la catégorie pro si déjà répondu
`, async () => {
  await render(
    <DureePreavisRetraite
      icon=""
      title=""
      displayTitle=""
      publicodesRules={loadPublicodesRules("preavis-retraite")}
    />
  );

  fireEvent.click(ui.introduction.startButton.get());
  fireEvent.click(ui.origin.mise.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  expect(ui.information.agreement1517.categoryPro.query()).toBeInTheDocument();

  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.previous.get());

  fireEvent.click(ui.origin.depart.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  expect(
    ui.information.agreement1517.categoryPro.query()
  ).not.toBeInTheDocument();
  expect(ui.information.handicap.query()).toBeInTheDocument();

  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.previous.get());

  fireEvent.click(ui.origin.mise.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());
  fireEvent.change(ui.information.agreement1517.categoryProInput.get(), {
    target: {
      value: "'Agents de maîtrise (Niveau VI)'",
    },
  });

  fireEvent.click(ui.previous.get());
  fireEvent.click(ui.previous.get());

  fireEvent.click(ui.origin.mise.get());
  fireEvent.click(ui.next.get());
  fireEvent.click(ui.next.get());

  expect(ui.information.agreement1517.categoryPro.query()).toBeInTheDocument();
  expect(ui.information.agreement1517.categoryProInput.query()).toHaveValue(
    "'Agents de maîtrise (Niveau VI)'"
  );
  expect(ui.information.handicap.query()).toBeInTheDocument();
});
