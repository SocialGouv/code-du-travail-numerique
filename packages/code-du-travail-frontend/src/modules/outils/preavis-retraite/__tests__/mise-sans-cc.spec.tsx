import { UserAction } from "../../common/utils/UserAction";
import { CalculateurPreavisRetraite } from "../PreavisRetraiteSimulator";
import { ui } from "./ui";

import { render } from "@testing-library/react";

test(`Mise à la retraite sans sélection de CC
`, async () => {
  await render(<CalculateurPreavisRetraite title="Préavis de retraite" />);
  const userAction = new UserAction();

  expect(ui.introduction.startButton.query()).toBeInTheDocument();
  userAction.click(ui.introduction.startButton.get());
  userAction.click(ui.next.get());
  expect(ui.contract.originDepart.question.query()).toBeInTheDocument();
  userAction.click(ui.contract.originDepart.mise.get());
  expect(ui.contract.alert.query()).toBeInTheDocument();
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
  expect(ui.result.noticeMiseRetraite.get()).toBeInTheDocument();
  expect(ui.result.originDepart.get()).toHaveTextContent("Mise à la retraite");
  expect(ui.result.seniority.get()).toHaveTextContent("Plus de 2 ans");
  expect(ui.result.travailleurHandicape.get()).toHaveTextContent("Non");
  expect(ui.result.resultatLegal.get()).toHaveTextContent("2 mois");
  expect(ui.result.resultatAgreement.get()).toHaveTextContent(
    "convention collective non renseignée"
  );
  expect(ui.result.decryptedDescription.get()).toHaveTextContent(
    "La convention collective n'ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale."
  );
  const sources = ui.result.sources.queryAll();
  expect(sources).toHaveLength(2);
  expect(sources[0]).toHaveTextContent("Article L1237-6");
  expect(sources[1]).toHaveTextContent("Article L1234-1");
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Attention il peut exister une durée plus favorable"
  );
  expect(ui.result.noticeWarningDescription.get()).toHaveTextContent(
    "Une convention collective de branche, un accord collectif d'entreprise, le contrat de travail ou un usage peut prévoir une durée de préavis(1) ou une condition d'ancienneté(2) plus favorable pour le salarié. Dans ce cas, c'est cette durée ou cette ancienneté plus favorable qui s'applique au salarié."
  );
});
