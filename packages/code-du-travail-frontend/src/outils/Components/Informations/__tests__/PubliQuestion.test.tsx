import { RuleType } from "@socialgouv/modeles-social";
import { render } from "@testing-library/react";
import React from "react";
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
                Cadres: "'Cadres'",
                "Non-cadres": "'Non-cadres'",
              },
            },
            description:
              "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
            nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
            question: "Quelle est la catégorie professionnelle du salarié ?",
            titre: "Catégorie professionnelle",
          }}
          value="v"
        />,
      ),
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
              Cadres: "'Cadres'",
              "Non-cadres": "'Non-cadres'",
            },
          },
          description:
            "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
          nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
          question: "Quelle est la catégorie professionnelle du salarié ?",
          titre: "Catégorie professionnelle",
        }}
        value="v"
      />,
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
              Cadres: "'Cadres'",
              "Non-cadres": "'Non-cadres'",
            },
          },
          description:
            "La catégorie professionnelle du salarié est habituellement mentionnée sur le <strong>bulletin de salaire</strong>.",
          nom: "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle",
          question: "Quelle est la catégorie professionnelle du salarié ?",
          titre: "Catégorie professionnelle",
        }}
        value="v"
      />,
    );
    expect(getAllByRole("radio")).toBeTruthy();
  });
});
