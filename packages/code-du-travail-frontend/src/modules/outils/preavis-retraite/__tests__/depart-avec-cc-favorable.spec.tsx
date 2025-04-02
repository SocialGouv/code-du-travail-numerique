import { CalculateurPreavisRetraite } from "../..";
import { UserAction } from "../../../common";
import { ui } from "./ui";

import { render } from "@testing-library/react";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
    "num": 1090,
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635191",
    "effectif": 422715,
    "shortTitle": "Services de l'automobile (Commerce et réparation de l'automobile, du cycle et du motocycle, activités connexes, contrôle technique automobile, formation des conducteurs)",
    "cdtnId": "98b9c85542",
    "id": "1090",
    "slug": "1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
    "title": "Convention collective nationale du commerce et de la réparation de l'automobile, du cycle et du motocycle et des activités connexes, ainsi que du contrôle technique automobile du 15 janvier 1981. Etendue par arrêté du 30 octobre 1981 JONC 3 décembre 1981.",
    "contributions": true
}
`
);

test(`Départ à la retraite avec une CC plus favorable
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
  userAction.click(ui.next.get());
  userAction.click(ui.next.get());
  expect(
    ui.information.agreement1090.categoryQuestion.query()
  ).toBeInTheDocument();
  userAction.changeInputList(
    ui.information.agreement1090.categoryAnswers.get(),
    "Ouvriers, Employés"
  );
  expect(
    ui.information.agreement1090.echelonQuestion.query()
  ).toBeInTheDocument();
  userAction.changeInputList(
    ui.information.agreement1090.echelonAnswers.get(),
    "1 et 2"
  );
  expect(ui.information.handicap.question.query()).toBeInTheDocument();
  userAction.click(ui.information.handicap.answerNon.get());
  userAction.click(ui.next.get());
  expect(ui.seniority.moreThanXYears.question.query()).toBeInTheDocument();
  userAction.click(ui.seniority.moreThanXYears.answerNon.get());
  expect(ui.seniority.seniorityInMonths.question.query()).toBeInTheDocument();
  userAction.setInput(ui.seniority.seniorityInMonths.input.get(), "3");
  userAction.click(ui.next.get());
  expect(ui.result.resultat.query()).toBeInTheDocument();
  expect(ui.result.print.query()).toBeInTheDocument();
  expect(ui.result.resultat.get()).toHaveTextContent("2 semaines");
  expect(ui.result.noticeDepartRetraite.get()).toBeInTheDocument();
  expect(ui.result.categorieProfessionnelle.get()).toHaveTextContent(
    "Ouvriers"
  );
  expect(ui.result.echelon.get()).toHaveTextContent("1");
  expect(ui.result.conventionCollective.get()).toHaveTextContent(
    "Services de l'automobile (Commerce et réparation de l'automobile, du cycle et du motocycle, activités connexes, contrôle technique automobile, formation des conducteurs)"
  );
  expect(ui.result.originDepart.get()).toHaveTextContent(
    "Départ à la retraite"
  );
  expect(ui.result.seniority.get()).toHaveTextContent("3 mois");
  expect(ui.result.travailleurHandicape.get()).toHaveTextContent("Non");
  expect(ui.result.resultatLegal.get()).toHaveTextContent("pas de préavis");
  expect(ui.result.resultatAgreement.get()).toHaveTextContent("2 semaines");
  expect(ui.result.decryptedDescription.get()).toHaveTextContent(
    "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective."
  );
  const sources = ui.result.sources.queryAll();
  expect(sources).toHaveLength(4);
  expect(sources[0]).toHaveTextContent("Article L1237-10");
  expect(sources[1]).toHaveTextContent("Article L1234-1");
  expect(sources[2]).toHaveTextContent("Article 1.23");
  expect(sources[3]).toHaveTextContent(
    "Article 2.12 pour les ouvriers et employés"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Attention il peut exister une durée plus favorable"
  );
  expect(ui.result.noticeWarning.get()).toHaveTextContent(
    "Un accord collectif d’entreprise, le contrat de travail ou un usage peut prévoir une durée de préavis* ou une condition d’ancienneté* plus favorable pour le salarié. Dans ce cas, c’est cette durée ou cette ancienneté plus favorable qui s’applique au salarié."
  );
});
