import { CalculateurPreavisRetraite } from "../../../../src/outils";
import { UserAction } from "../../../common";
import { ui } from "./ui";

import { render } from "@testing-library/react";

test(`Départ à la retraite sans sélection de CC
`, async () => {
  await render(
    <CalculateurPreavisRetraite icon={""} title={""} displayTitle={""} />
  );
  const userAction = new UserAction();

  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  userAction.click(ui.introduction.startButton.get());
  userAction.click(ui.next.get());
  expect(ui.contract.originDepart.question.query()).toBeInTheDocument();
  userAction.click(ui.contract.originDepart.depart.get());
  expect(ui.contract.alert.query()).not.toBeInTheDocument();
  userAction.click(ui.next.get());
  userAction.click(ui.agreement.noAgreement.get());
  userAction.click(ui.next.get());
  expect(ui.information.handicap.question.query()).toBeInTheDocument();
  userAction.click(ui.information.handicap.answerNon.get());
  userAction.click(ui.next.get());
  expect(ui.seniority.moreThanXYears.question.query()).toBeInTheDocument();
  userAction.click(ui.seniority.moreThanXYears.answerOui.get());
  userAction.click(ui.next.get());
  expect(ui.result.resultat.query()).toBeInTheDocument();
  expect(ui.result.print.query()).toBeInTheDocument();
  expect(ui.result.resultat.get()).toHaveTextContent("2 mois");
  expect(ui.result.noticeDepartRetraite.get()).toBeInTheDocument();
  expect(ui.result.originDepart.get()).toHaveTextContent(
    "Départ à la retraite"
  );
  expect(ui.result.seniority.get()).toHaveTextContent("Plus de 2 ans");
  expect(ui.result.travailleurHandicape.get()).toHaveTextContent("Non");
  expect(ui.result.resultatLegal.get()).toHaveTextContent("2 mois");
  expect(ui.result.resultatAgreement.get()).toHaveTextContent(
    "convention collective non renseignée"
  );
  expect(ui.result.decryptedDescription.get()).toHaveTextContent(
    "La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."
  );
  const sources = ui.result.sources.queryAll();
  expect(sources).toHaveLength(2);
  expect(sources[0]).toHaveTextContent("Article L1237-10");
  expect(sources[1]).toHaveTextContent("Article L1234-1");
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Attention il peut exister une durée plus favorable"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Une convention collective de branche, un accord collectif d’entreprise, le contrat de travail ou un usage peut prévoir une durée de préavis* ou une condition d’ancienneté* plus favorable pour le salarié. Dans ce cas, c’est cette durée ou cette ancienneté plus favorable qui s’applique au salarié."
  );
});
