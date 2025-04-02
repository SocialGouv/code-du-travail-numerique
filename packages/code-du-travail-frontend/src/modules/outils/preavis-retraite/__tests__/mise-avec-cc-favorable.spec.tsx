import { CalculateurPreavisRetraite } from "../..";
import { UserAction } from "../../../common";
import { ui } from "./ui";

import { render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 16,
  "shortTitle": "Transports routiers et activités auxiliaires du transport",
  "id": "KALICONT000005635624",
  "title": "Transports routiers et activités auxiliaires du transport",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
  "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
}
`
);

test(`Mise à la retraite avec une CC plus favorable
`, async () => {
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
    ui.information.agreement16.categoryQuestion.query()
  ).toBeInTheDocument();
  userAction.changeInputList(
    ui.information.agreement16.categoryAnswers.get(),
    "Ouvriers"
  );
  expect(ui.information.handicap.question.query()).toBeInTheDocument();
  userAction.click(ui.information.handicap.answerNon.get());
  userAction.click(ui.next.get());
  expect(ui.seniority.moreThanXYears.question.query()).toBeInTheDocument();
  userAction.click(ui.seniority.moreThanXYears.answerNon.get());
  expect(ui.seniority.seniorityInMonths.question.query()).toBeInTheDocument();
  userAction.setInput(ui.seniority.seniorityInMonths.input.get(), "5");
  userAction.click(ui.next.get());
  expect(ui.result.resultat.query()).toBeInTheDocument();
  expect(ui.result.print.query()).toBeInTheDocument();
  expect(ui.result.resultat.get()).toHaveTextContent("1 semaine");
  expect(ui.result.noticeMiseRetraite.get()).toBeInTheDocument();
  expect(ui.result.categorieProfessionnelle.get()).toHaveTextContent(
    "Ouvriers"
  );
  expect(ui.result.conventionCollective.get()).toHaveTextContent(
    "Transports routiers et activités auxiliaires du transport"
  );
  expect(ui.result.originDepart.get()).toHaveTextContent("Mise à la retraite");
  expect(ui.result.seniority.get()).toHaveTextContent("5 mois");
  expect(ui.result.travailleurHandicape.get()).toHaveTextContent("Non");
  expect(ui.result.resultatLegal.get()).toHaveTextContent("pas de préavis");
  expect(ui.result.resultatAgreement.get()).toHaveTextContent("1 semaine");
  expect(ui.result.decryptedDescription.get()).toHaveTextContent(
    "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."
  );
  const sources = ui.result.sources.queryAll();
  expect(sources).toHaveLength(3);
  expect(sources[0]).toHaveTextContent("Article L1237-6");
  expect(sources[1]).toHaveTextContent("Article L1234-1");
  expect(sources[2]).toHaveTextContent(
    "Accord du 16 juin 1961 relatifs aux ouvriers - annexe I, article 5"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Attention il peut exister une durée plus favorable"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Un accord collectif d’entreprise, le contrat de travail ou un usage peut prévoir une durée de préavis* ou une condition d’ancienneté* plus favorable pour le salarié. Dans ce cas, c’est cette durée ou cette ancienneté plus favorable qui s’applique au salarié."
  );
});
