import { fireEvent, render, screen } from "@testing-library/react";
import { InformationStepTest } from "./components/TestInformation";
import userEvent from "@testing-library/user-event";

describe("Quand l'utilisateur arrive sur la page avec une convention collective sélectionnée", () => {
  let rendering;
  beforeEach(() => {
    rendering = render(
      <InformationStepTest
        agreement={{
          url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          id: "KALICONT000005635624",
          num: 16,
          shortTitle:
            "Transports routiers et activités auxiliaires du transport",
          slug: "16-transports-routiers-et-activites-auxiliaires-du-transport",
          title: "Transports routiers et activités auxiliaires du transport",
        }}
      />
    );
  });

  it("affiche la première question manquante", () => {
    expect(
      rendering.getByText(
        "Quelle est la catégorie professionnelle du salarié ?"
      )
    ).toBeInTheDocument();
  });

  describe("Quand l'utilisateur répond à la première question", () => {
    beforeEach(() => {
      userEvent.selectOptions(
        rendering.getByRole("combobox", {
          name: /Quelle est la catégorie professionnelle du salarié ?/i,
        }),
        "Ingénieurs et cadres"
      );
    });
    it("doit afficher la prochaine question manquante quand l'utilisateur répond", () => {
      expect(
        rendering.getByText(
          /Avant d'être cadre le salarié a-t-il été employé ou technicien dans l’entreprise/
        )
      ).toBeInTheDocument();
    });

    describe("Quand l'utilisateur répond à l'ensemble des question", () => {
      beforeEach(() => {
        userEvent.selectOptions(
          rendering.getByRole("combobox", {
            name: /Quelle est la catégorie professionnelle du salarié ?/i,
          }),
          "Ingénieurs et cadres"
        );
        userEvent.click(
          rendering.getByRole("radio", {
            name: "Oui",
          })
        );
        fireEvent.change(
          rendering.getByRole("textbox", {
            name: /A quelle date le salarié a-t-il changé de catégorie/,
          }),
          { target: { value: "01/01/2010" } }
        );
        fireEvent.change(
          rendering.getByRole("spinbutton", {
            name: /Quel est l'âge du salarié/,
          }),
          { target: { value: "62" } }
        );
      });

      it("doit pouvoir passer à l'étape suivante", () => {});

      describe("Quand l'utilisateur change sa réponse à la première question", () => {
        beforeEach(() => {
          userEvent.selectOptions(
            rendering.getByRole("combobox", {
              name: /Quelle est la catégorie professionnelle du salarié ?/i,
            }),
            "Ouvriers"
          );
        });

        it("ne doit plus voir les réponses déjà répondu", () => {
          expect(
            rendering.queryByText(
              /Avant d'être cadre le salarié a-t-il été employé ou technicien dans l’entreprise/
            )
          ).not.toBeInTheDocument();

          expect(
            rendering.queryByText(
              /A quelle date le salarié a-t-il changé de catégorie/
            )
          ).not.toBeInTheDocument();

          expect(
            rendering.queryByText(
              /Le salarié remplit-il les conditions pour partir à la retraite ?/
            )
          ).not.toBeInTheDocument();
        });

        it("doit avoir la prochaine question posé sans valeur saisie", () => {
          expect(
            rendering.getByText(/Quel est l'âge du salarié ?/)
          ).toBeInTheDocument();

          expect(
            rendering.getByRole("spinbutton", {
              name: /Quel est l'âge du salarié/,
            })
          ).toHaveValue(null);
        });
      });
    });
  });
});
