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
    ).toHaveLength(1);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.info
    ).toBeUndefined();
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.order
    ).toEqual(0);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]
        ?.question?.name
    ).toEqual(
      "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle"
    );
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
    ).toHaveLength(2);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.info
    ).toEqual("'Cadres'");
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.order
    ).toEqual(0);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]
        ?.question?.name
    ).toEqual(
      "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle"
    );
    expect(
      store.getState().informationsData.input.publicodesInformations[1]?.info
    ).toBeUndefined();
    expect(
      store.getState().informationsData.input.publicodesInformations[1]?.order
    ).toEqual(1);
    expect(
      store.getState().informationsData.input.publicodesInformations[1]
        ?.question?.name
    ).toEqual(
      "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle - cadre - non cadre durant une période"
    );
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
    ).toHaveLength(1);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.info
    ).toEqual("'Non-cadres'");
    expect(
      store.getState().informationsData.input.publicodesInformations[0]?.order
    ).toEqual(0);
    expect(
      store.getState().informationsData.input.publicodesInformations[0]
        ?.question?.name
    ).toEqual(
      "contrat salarié - convention collective - hospitalisation privées - indemnité de licenciement - catégorie professionnelle"
    );
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
