import { CalculateurPreavisRetraite } from "../..";
import { UserAction } from "../../../common";
import { ui } from "./ui";

import { render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
    "num": 2264,
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635813",
    "effectif": 272286,
    "shortTitle": "Hospitalisation privée",
    "cdtnId": "56ec89636a",
    "id": "2264",
    "slug": "2264-hospitalisation-privee",
    "title": "Convention collective nationale de l'hospitalisation privée du 18 avril 2002",
    "contributions": true
}
`
);

test(`5 ans minimum pour la question pour la CC 2264`, async () => {
  await render(
    <CalculateurPreavisRetraite icon={""} title={""} displayTitle={""} />
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
    ui.information.agreement2264.categoryQuestion.query()
  ).toBeInTheDocument();
  userAction.changeInputList(
    ui.information.agreement2264.categoryAnswers.get(),
    "Non-cadres"
  );
  expect(ui.information.handicap.question.query()).toBeInTheDocument();
  userAction.click(ui.information.handicap.answerNon.get());
  userAction.click(ui.next.get());
  expect(
    ui.seniority.moreThanXYears.questionAvec5ans.query()
  ).toBeInTheDocument();
  userAction.click(ui.seniority.moreThanXYears.answerOui.get());
  userAction.click(ui.next.get());
  expect(ui.result.resultat.query()).toBeInTheDocument();
  expect(ui.result.print.query()).toBeInTheDocument();
  expect(ui.result.resultat.get()).toHaveTextContent("3 mois");
  expect(ui.result.noticeMiseRetraite.get()).toBeInTheDocument();
  expect(ui.result.categorieProfessionnelle.get()).toHaveTextContent(
    "Non-cadres"
  );
  expect(ui.result.conventionCollective.get()).toHaveTextContent(
    "Hospitalisation privée"
  );
  expect(ui.result.originDepart.get()).toHaveTextContent("Mise à la retraite");
  expect(ui.result.seniority.get()).toHaveTextContent("Plus de 5 ans");
  expect(ui.result.travailleurHandicape.get()).toHaveTextContent("Non");
  expect(ui.result.resultatLegal.get()).toHaveTextContent("2 mois");
  expect(ui.result.resultatAgreement.get()).toHaveTextContent("3 mois");
  expect(ui.result.decryptedDescription.get()).toHaveTextContent(
    "La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus longue que la durée légale."
  );
  const sources = ui.result.sources.queryAll();
  expect(sources).toHaveLength(3);
  expect(sources[0]).toHaveTextContent("Article L1237-6");
  expect(sources[1]).toHaveTextContent("Article L1234-1");
  expect(sources[2]).toHaveTextContent("Article 50.3");
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Attention il peut exister une durée plus favorable"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Un accord collectif d’entreprise, le contrat de travail ou un usage peut prévoir une durée de préavis* ou une condition d’ancienneté* plus favorable pour le salarié. Dans ce cas, c’est cette durée ou cette ancienneté plus favorable qui s’applique au salarié."
  );
});
