import { CalculateurPreavisRetraite } from "../..";
import { UserAction } from "../../../common";
import { ui } from "./ui";

import { render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
  "id": "KALICONT000044594539",
  "num": 3239,
  "shortTitle": "Particuliers employeurs et emploi à domicile",
  "slug": "3239-particuliers-employeurs-et-emploi-a-domicile",
  "title": "Particuliers employeurs et emploi à domicile"
}
`,
);

test(`Mise à la retraite pour la CC 3239 impossible`, async () => {
  await render(
    <CalculateurPreavisRetraite icon={""} title={""} displayTitle={""} />,
  );
  const userAction = new UserAction();

  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  userAction.click(ui.introduction.startButton.get());
  userAction.click(ui.next.get());
  expect(ui.contract.originDepart.question.query()).toBeInTheDocument();
  userAction.click(ui.contract.originDepart.mise.get());
  expect(ui.contract.alert.query()).toBeInTheDocument();
  userAction.click(ui.next.get());
  userAction.click(ui.next.get());
  expect(
    ui.information.agreement3239.categoryQuestion.query(),
  ).toBeInTheDocument();
  userAction.changeInputList(
    ui.information.agreement3239.categoryAnswers.get(),
    "Assistants maternels du particulier employeur",
  );
  userAction.click(ui.information.handicap.answerNon.get());
  expect(ui.information.agreement3239.alert.query()).not.toBeInTheDocument();
  userAction.click(ui.next.get());
  expect(ui.information.agreement3239.alert.query()).toBeInTheDocument();
});
