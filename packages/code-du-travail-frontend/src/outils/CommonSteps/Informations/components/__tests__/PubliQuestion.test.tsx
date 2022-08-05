import { RuleType } from "@socialgouv/modeles-social";
import { render } from "@testing-library/react";
import React from "react";
import { MatomoActionEvent } from "../../../../../lib";
import PubliQuestion from "../PubliQuestion";

describe("<PubliQuestion />", () => {
  it("should render", () => {
    expect(
      render(
        <PubliQuestion
          name="question"
          onChange={jest.fn()}
          rule={{
            cdtn: {
              type: RuleType.Liste,
              valeurs: {
                Cadre: "'Cadre'",
                "Non-cadre": "'Non-cadre'",
              },
            },
            description:
              "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
            question: "Quelle est la catégorie professionnelle du salarié ?",
            titre: "Catégorie professionnelle",
          }}
          value="v"
          trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
        />
      )
    ).toBeTruthy();
  });

  it("should render a list", () => {
    const { getByRole } = render(
      <PubliQuestion
        name="question"
        onChange={jest.fn()}
        rule={{
          cdtn: {
            type: RuleType.Liste,
            valeurs: {
              Cadre: "'Cadre'",
              "Non-cadre": "'Non-cadre'",
            },
          },
          description:
            "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
          nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
          question: "Quelle est la catégorie professionnelle du salarié ?",
          titre: "Catégorie professionnelle",
        }}
        value="v"
        trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
      />
    );
    expect(getByRole("combobox")).toBeTruthy();
  });

  it("should render a radio question", () => {
    const { getAllByRole } = render(
      <PubliQuestion
        name="question"
        onChange={jest.fn()}
        rule={{
          cdtn: {
            type: RuleType.OuiNon,
            valeurs: {
              Cadre: "'Cadre'",
              "Non-cadre": "'Non-cadre'",
            },
          },
          description:
            "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
          nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
          question: "Quelle est la catégorie professionnelle du salarié ?",
          titre: "Catégorie professionnelle",
        }}
        value="v"
        trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
      />
    );
    expect(getAllByRole("radio")).toBeTruthy();
  });

  it("should render an input question", () => {
    const { getByRole } = render(
      <PubliQuestion
        name="question"
        onChange={jest.fn()}
        rule={{
          cdtn: {
            type: RuleType.SalaireMensuel,
            valeurs: {
              Cadre: "'Cadre'",
              "Non-cadre": "'Non-cadre'",
            },
          },
          description:
            "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
          nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
          question: "Quelle est la catégorie professionnelle du salarié ?",
          titre: "Catégorie professionnelle",
        }}
        value="v"
        trackQuestionEvent={MatomoActionEvent.INDEMNITE_LICENCIEMENT}
      />
    );
    expect(getByRole("spinbutton")).toBeTruthy();
  });
});
