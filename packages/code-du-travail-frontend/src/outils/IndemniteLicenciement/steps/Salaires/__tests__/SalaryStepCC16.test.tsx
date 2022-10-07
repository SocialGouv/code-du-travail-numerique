import { SalaryStepTest } from "./components/SalaryStepTest";
import { render, RenderResult, screen } from "@testing-library/react";
import { createIndemniteLicenciementStore, MainStore } from "../../../store";
import { loadPublicodesRules } from "../../../../api";
import userEvent from "@testing-library/user-event";
import { StoreApi } from "zustand";

describe("Quand l'utilisateur arrive sur l'étape salaire avec la convention collective 16", () => {
  let store: StoreApi<MainStore>;
  let rendering: RenderResult;
  beforeEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
    store.getState().agreementFunction.onAgreementChange({
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
      id: "KALICONT000005635624",
      num: 16,
      shortTitle: "Transports routiers et activités auxiliaires du transport",
      slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
      title: "Transports routiers et activités auxiliaires du transport",
    });
  });

  describe("Quand l'utilisateur sélectionne la catégorie 'Ouvriers'", () => {
    beforeEach(() => {
      store
        .getState()
        .informationsFunction.onInformationsChange(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle",
          "'Ouvriers'"
        );
      rendering = render(<SalaryStepTest store={() => store} />);
      userEvent.click(
        rendering.getAllByRole("radio", {
          name: "Non",
        })[0]
      );
    });

    describe("Quand l'utilisateur a eu le même salaire sur les 12 derniers mois", () => {
      beforeEach(() => {
        userEvent.click(
          rendering.getAllByRole("radio", {
            name: "Oui",
          })[1]
        );
      });
      it("ne doit pas avoir la question sur le variable", () => {
        expect(
          rendering.queryByText(
            /Les salaires indiqués comportent-il une partie variable/
          )
        ).not.toBeInTheDocument();
      });
    });

    describe("Quand l'utilisateur n'a pas eu le même salaire sur les 12 derniers mois", () => {
      beforeEach(() => {
        userEvent.click(
          rendering.getAllByRole("radio", {
            name: "Non",
          })[1]
        );
      });
      it("ne doit pas avoir la question sur le variable", () => {
        expect(
          rendering.queryByText(
            /Les salaires indiqués comportent-il une partie variable/
          )
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Quand l'utilisateur sélectionne la catégorie 'Ingénieurs et cadres'", () => {
    beforeEach(() => {
      store
        .getState()
        .informationsFunction.onInformationsChange(
          "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle",
          "'Ingénieurs et cadres'"
        );
      rendering = render(<SalaryStepTest store={() => store} />);
      userEvent.click(
        rendering.getAllByRole("radio", {
          name: "Non",
        })[0]
      );
    });
    describe("Quand l'utilisateur a eu le même salaire sur les 12 derniers mois", () => {
      beforeEach(() => {
        userEvent.click(
          rendering.getAllByRole("radio", {
            name: "Oui",
          })[1]
        );
      });
      it("ne doit pas avoir la question sur le variable", () => {
        expect(
          rendering.queryByText(
            /Les salaires indiqués comportent-il une partie variable/
          )
        ).not.toBeInTheDocument();
      });
    });

    describe("Quand l'utilisateur n'a pas eu le même salaire sur les 12 derniers mois", () => {
      beforeEach(() => {
        userEvent.click(
          rendering.getAllByRole("radio", {
            name: "Non",
          })[1]
        );
      });
      it("doit avoir la question sur le variable", () => {
        expect(
          rendering.queryByText(
            /Les salaires indiqués comportent-il une partie variable/
          )
        ).toBeInTheDocument();
      });
    });
  });
});
