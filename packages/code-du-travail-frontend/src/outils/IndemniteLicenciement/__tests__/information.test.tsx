import { render, RenderResult, waitFor } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        hits: {
          hits: [
            {
              _source: {
                effectif: 1173,
                highlight: {
                  searchInfo:
                    "(anciennement conventions collectives “Assistants maternels du particulier employeur” IDCC 2395 et “Salariés du particulier employeur” IDCC 2111).",
                  title:
                    "À noter : les informations données sur cette page sont applicables depuis le 01/01/2022",
                  content:
                    "Cette convention collective est entrée en vigueur au 01/01/2022 suite à la fusion des conventions collectives “Salariés du particulier employeur (IDCC 2111)” et “Assistants maternels du particulier employeur (IDCC 2395)” qui étaient applicables jusqu’au 31/12/2021.",
                },
                cdtnId: "d825ef1df2",
                num: 3239,
                shortTitle: "Particuliers employeurs et emploi à domicile",
                id: "KALICONT000044594539",
                title: "Particuliers employeurs et emploi à domicile",
                slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000044594539",
              },
            },
          ],
        },
      }),
  })
) as jest.Mock;

describe("Indemnité licenciement - Validation de la page information", () => {
  describe("parcours avec la convention collective 16 pour valider les erreurs", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(async () => {
      rendering = await render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
        />
      );
      userAction = new UserAction();
      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.contract.type.cdi.get())
        .click(ui.contract.fauteGrave.non.get())
        .click(ui.contract.inaptitude.non.get())
        .click(ui.next.get())
        .click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
    });

    test(`
       - validation que la première question est affichée
       - validation des erreurs sur les champs vides
       - validation que le champ suivant s'affiche quand on répond à la question
       - validation que les champs sont retirés quand on revient à une question précédente
       - validation qu'un champ présent avant soit réinitialisé
       - validation que l'on peut valider la page quand tous les champs sont saisis
       - validation que les infos sont gardées quand on revient sur les étapes précédentes sans changer les infos
       - validation que les infos sont effacées quand on change de convention collective
    `, async () => {
      // validation que la première question est affichée
      expect(
        rendering.queryByText(
          "Quelle est la catégorie professionnelle du salarié ?"
        )
      ).toBeInTheDocument();

      // validation des erreurs sur les champs vides
      userAction.click(ui.next.get());
      expect(
        rendering.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();
      userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres"
      );
      expect(
        rendering.queryByText(
          "Avant d'être cadre, le salarié a-t-il été employé, technicien ou agent de maîtrise dans l’entreprise ?"
        )
      ).toBeInTheDocument();
      expect(
        rendering.queryAllByText("Vous devez répondre à cette question")
      ).toHaveLength(1);

      // validation que les champs sont retirés quand on revient à une question précédente
      userAction
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(
          ui.information.agreement16.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(ui.information.agreement16.engineerAge.get(), "38")
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Ouvriers"
        );

      expect(rendering.getAllByTestId("question-label")).toHaveLength(2);
      expect(
        ui.information.agreement16.driveInability.oui.get()
      ).not.toBeChecked();
      expect(
        ui.information.agreement16.driveInability.non.get()
      ).not.toBeChecked();

      // validation qu'un champ présent avant soit réinitialisé
      userAction
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Employés"
        )
        .setInput(ui.information.agreement16.employeeAge.get(), "55")
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Technicien et agents de maîtrise (TAM)"
        );
      expect(rendering.getAllByTestId("question-label")).toHaveLength(2);
      expect(ui.information.agreement16.agentAge.query()).toHaveValue(null);

      // validation que l'on peut valider la page quand tous les champs sont saisis
      userAction
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Ingénieurs et cadres"
        )
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(
          ui.information.agreement16.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(ui.information.agreement16.engineerAge.get(), "38")
        .click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");

      // validation que les infos sont gardées quand on revient sur les étapes précédentes sans changer les infos
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.next.get())
        .click(ui.next.get());

      expect(rendering.getAllByTestId("question-label")).toHaveLength(4);
      expect(ui.information.agreement16.proCategory.get()).toHaveValue(
        "'Ingénieurs et cadres'"
      );
      expect(
        ui.information.agreement16.proCategoryHasChanged.oui.get()
      ).toBeChecked();
      expect(
        ui.information.agreement16.dateProCategoryChanged.get()
      ).toHaveValue("01/01/2010");
      expect(ui.information.agreement16.engineerAge.get()).toHaveValue(38);

      // validation que les infos sont effacées quand on change de convention collective
      userAction
        .click(ui.previous.get())
        .click(ui.agreement.noAgreement.get())
        .click(ui.agreement.agreement.get())
        .setInput(ui.agreement.agreementInput.get(), "3239")
        .click(
          await waitFor(() =>
            rendering.getByText("Particuliers employeurs et emploi à domicile")
          )
        )
        .click(ui.next.get());

      expect(rendering.getAllByTestId("question-label")).toHaveLength(1);
      expect(ui.information.agreement3239.proCategory.get()).toHaveValue("");
    });
  });
});
