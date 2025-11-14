import { render, waitFor, RenderResult } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import { CalculateurIndemniteLicenciement } from "../IndemniteLicenciementSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";

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

jest.mock(
  "../../../convention-collective/AgreementSearch/AgreementSearchInput"
);

describe("Indemnité licenciement - Validation de la page information", () => {
  describe("parcours avec la convention collective 16 pour valider les erreurs", () => {
    let userAction: UserAction;
    let container: RenderResult;
    beforeEach(async () => {
      container = render(<CalculateurIndemniteLicenciement title={""} />);
      userAction = new UserAction();
      userAction
        .click(ui.introduction.startButton.get())
        .click(ui.contract.type.cdi.get())
        .click(ui.contract.fauteGrave.non.get())
        .click(ui.contract.inaptitude.non.get())
        .click(ui.contract.arretTravail.non.get())
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
      - validation que l'on n'affiche pas la question suivante tant que la date n'est pas valide
      - validation que les infos sont gardées quand on revient sur les étapes précédentes sans changer les infos
      - validation que les infos sont effacées quand on change de convention collective
    `, async () => {
      // validation que la première question est affichée
      expect(
        container.queryByText(
          "Quelle est la catégorie professionnelle du salarié ?"
        )
      ).toBeInTheDocument();

      // validation des erreurs sur les champs vides
      userAction.click(ui.next.get());
      expect(
        container.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres"
      );
      expect(
        container.queryByText(
          "Avant d'être cadre, le salarié a-t-il été employé, technicien ou agent de maîtrise dans l’entreprise ?"
        )
      ).toBeInTheDocument();
      expect(
        container.queryAllByText("Vous devez répondre à cette question")
      ).toHaveLength(1);

      // validation que les champs sont retirés quand on revient à une question précédente
      userAction
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(
          ui.information.agreement16.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(ui.information.agreement16.engineerAge.get(), "38");
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ouvriers"
      );

      expect(
        ui.information.agreement16.driveInability.oui.get()
      ).not.toBeChecked();
      expect(
        ui.information.agreement16.driveInability.non.get()
      ).not.toBeChecked();

      // validation qu'un champ présent avant soit réinitialisé
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Employés"
      );
      userAction.setInput(ui.information.agreement16.employeeAge.get(), "55");
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Technicien et agents de maîtrise (TAM)"
      );
      expect(ui.information.agreement16.agentAge.query()).toHaveValue(null);

      // validation que l'on n'affiche pas la question suivante tant que la date n'est pas valide
      await userAction.changeInputList(
        ui.information.agreement16.proCategory.get(),
        "Ingénieurs et cadres"
      );
      userAction
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(ui.information.agreement16.dateProCategoryChanged.get(), "1");
      expect(
        ui.information.agreement16.engineerAge.query()
      ).not.toBeInTheDocument();

      // validation que l'on peut valider la page quand tous les champs sont saisis
      userAction
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

      expect(ui.information.agreement16.proCategory.get()).toHaveValue(
        "'Ingénieurs et cadres'"
      );
      expect(
        ui.information.agreement16.proCategoryHasChanged.oui.get()
      ).toBeChecked();
      expect(
        ui.information.agreement16.dateProCategoryChanged.get()
      ).toHaveValue("2010-01-01");
      expect(ui.information.agreement16.engineerAge.get()).toHaveValue(38);

      // validation que les infos sont effacées quand on change de convention collective
      userAction
        .click(ui.previous.get())
        .click(ui.agreement.noAgreement.get())
        .click(ui.agreement.agreement.get())
        .setInput(ui.agreement.agreementInput.get(), "3239")
        .click(
          await waitFor(() =>
            container.getByText(
              "Particuliers employeurs et emploi à domicile (IDCC 3239)"
            )
          )
        )
        .click(ui.next.get());

      expect(ui.information.agreement3239.proCategory.get()).toHaveValue("");
    });
  });
});
