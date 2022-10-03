import { loadPublicodesRules } from "../../../../api";
import { createIndemniteLicenciementStore } from "../../../../IndemniteLicenciement/store";

describe("Informations store", () => {
  let store: ReturnType<typeof createIndemniteLicenciementStore>;

  beforeEach(() => {
    store = createIndemniteLicenciementStore(
      loadPublicodesRules("indemnite-licenciement")
    );
  });

  it("should be defined and init", () => {
    expect(store).toBeDefined();
  });

  it("should init data input", () => {
    expect(store.getState().informationsData.input.hasNoMissingQuestions).toBe(
      false
    );
    expect(store.getState().informationsData.input.isStepHidden).toBe(true);
    expect(
      store.getState().informationsData.input.publicodesInformations
    ).toEqual([]);
  });

  it("should generate publicodes questions", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 2264,
      shortTitle: "",
      slug: "",
      title: "",
    });
    expect(store.getState().informationsData.input.isStepHidden).toBe(false);
    expect(
      store.getState().informationsData.input.publicodesInformations
    ).toEqual([
      {
        info: undefined,
        order: 0,
        question: {
          name: "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle",
          rule: {
            cdtn: {
              type: "liste",
              valeurs: {
                Cadres: "'Cadres'",
                "Non-cadres": "'Non-cadres'",
              },
            },
            description:
              "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
            question: "Quelle est la catégorie professionnelle du salarié ?",
            titre: "Catégorie professionnelle",
          },
        },
      },
    ]);
  });

  it("should generate 0 publicodes questions", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 12345,
      shortTitle: "",
      slug: "",
      title: "",
    });
    expect(store.getState().informationsData.input.isStepHidden).toBe(true);
    expect(
      store.getState().informationsData.input.publicodesInformations
    ).toEqual([]);
  });

  it("should generate next publicodes questions", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 2264,
      shortTitle: "",
      slug: "",
      title: "",
    });
    store
      .getState()
      .informationsFunction.onInformationsChange(
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
        "'Cadres'"
      );
    expect(
      store.getState().informationsData.input.publicodesInformations
    ).toEqual([
      {
        info: "'Cadres'",
        order: 0,
        question: {
          name: "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle",
          rule: {
            cdtn: {
              type: "liste",
              valeurs: {
                Cadres: "'Cadres'",
                "Non-cadres": "'Non-cadres'",
              },
            },
            description:
              "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
            question: "Quelle est la catégorie professionnelle du salarié ?",
            titre: "Catégorie professionnelle",
          },
        },
      },
      {
        info: undefined,
        order: 1,
        question: {
          name: "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle - cadre - non cadre durant une période",
          rule: {
            cdtn: {
              type: "oui-non",
            },
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période",
            question:
              "Le salarié a-t-il précédemment occupé des fonctions non-cadre durant le contrat de travail&nbsp;?",
            titre: "Fonctions de non-cadre durant le contrat de travail",
          },
        },
      },
    ]);
    expect(store.getState().informationsData.input.isStepHidden).toBe(false);
    expect(store.getState().informationsData.input.hasNoMissingQuestions).toBe(
      false
    );
  });

  it("should generate no next publicodes questions", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 2264,
      shortTitle: "",
      slug: "",
      title: "",
    });
    store
      .getState()
      .informationsFunction.onInformationsChange(
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
        "'Non-cadres'"
      );
    expect(
      store.getState().informationsData.input.publicodesInformations
    ).toEqual([
      {
        info: "'Non-cadres'",
        order: 0,
        question: {
          name: "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle",
          rule: {
            cdtn: {
              type: "liste",
              valeurs: {
                Cadres: "'Cadres'",
                "Non-cadres": "'Non-cadres'",
              },
            },
            description:
              "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
            question: "Quelle est la catégorie professionnelle du salarié ?",
            titre: "Catégorie professionnelle",
          },
        },
      },
    ]);
    expect(store.getState().informationsData.input.isStepHidden).toBe(false);
    expect(store.getState().informationsData.input.hasNoMissingQuestions).toBe(
      true
    );
  });

  it("should validate step", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 2264,
      shortTitle: "",
      slug: "",
      title: "",
    });
    store
      .getState()
      .informationsFunction.onInformationsChange(
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
        "'Non-cadres'"
      );
    store.getState().informationsFunction.onValidateStep();
    expect(store.getState().informationsData.isStepValid).toBe(true);
  });

  it("should no validate step", () => {
    store.getState().agreementFunction.onAgreementChange({
      id: "AAA",
      num: 2264,
      shortTitle: "",
      slug: "",
      title: "",
    });
    store
      .getState()
      .informationsFunction.onInformationsChange(
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
        "'Cadres'"
      );
    store.getState().informationsFunction.onValidateStep();
    expect(store.getState().informationsData.isStepValid).toBe(false);
  });
});
