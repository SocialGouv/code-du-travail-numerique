import {
  default as Outils,
  getServerSideProps,
  Props,
} from "../../../../pages/outils/[slug]";

import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ relatedItems: [] }),
  })
) as jest.Mock;

describe("Quand j'arrive sur l'outil d'idemnité licenciement", () => {
  let rendering;
  beforeEach(async () => {
    await act(async () => {
      // @ts-ignore
      const { props }: Props = await getServerSideProps({
        query: { slug: "indemnite-licenciement" },
      });
      rendering = await render(<Outils {...props} />);
    });
  });
  it("doit afficher le titre de l'outil", () => {
    expect(
      rendering.queryByText("Calculer l'indemnité de licenciement")
    ).toBeInTheDocument();
  });
  it("doit afficher le bouton commencer", () => {
    expect(rendering.queryByText("Commencer")).toBeInTheDocument();
  });
  describe("Quand je clique sur le bouton commencer", () => {
    beforeEach(
      async () =>
        await act(async () => {
          await fireEvent.click(rendering.queryByText("Commencer"));
        })
    );
    it("doit afficher la question type de contrat", () => {
      expect(
        rendering.queryByText("Quel est le type du contrat de travail ?")
      ).toBeInTheDocument();
    });

    it("doit afficher les réponses de la question type de contrat", () => {
      expect(
        rendering.queryByText(
          "Contrat à durée determiné (CDD) ou contrat d’intérim"
        )
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Contrat à durée indeterminé (CDI)")
      ).toBeInTheDocument();
    });

    it("doit afficher la question faute grave", () => {
      expect(
        rendering.queryByText(
          "Le licenciement est-il dû à une faute grave (ou lourde) ?"
        )
      ).toBeInTheDocument();
    });

    it("doit afficher les réponses de la question faute grave", () => {
      expect(rendering.queryAllByText("Oui")[0]).toBeInTheDocument();
      expect(rendering.queryAllByText("Non")[0]).toBeInTheDocument();
    });

    it("doit afficher la question pour inaptitude", () => {
      expect(
        rendering.queryByText(
          "Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue ?"
        )
      ).toBeInTheDocument();
    });

    it("doit afficher les réponses de la question pour inaptitude", () => {
      expect(rendering.queryAllByText("Oui")[1]).toBeInTheDocument();
      expect(rendering.queryAllByText("Non")[1]).toBeInTheDocument();
    });

    describe("Quand je clique sur la 1e réponse à la question type de contrat", () => {
      beforeEach(
        async () =>
          await act(async () => {
            await fireEvent.click(
              rendering.queryByText(
                "Contrat à durée determiné (CDD) ou contrat d’intérim"
              )
            );
          })
      );
      it("doit afficher l'info bulle", () => {
        expect(
          rendering.queryByText("indemnité de précarité (nouvelle fenêtre)")
        ).toBeInTheDocument();
      });
      describe("Quand je clique sur la 2e réponse à la question type de contrat", () => {
        beforeEach(
          async () =>
            await act(async () => {
              await fireEvent.click(
                rendering.queryByText("Contrat à durée indeterminé (CDI)")
              );
            })
        );
        it("ne doit plus afficher l'info bulle", () => {
          expect(
            rendering.queryByText("indemnité de précarité (nouvelle fenêtre)")
          ).not.toBeInTheDocument();
        });
      });
      describe("Quand je clique sur la 1e réponse à la question faute grave", () => {
        beforeEach(
          async () =>
            await act(async () => {
              await fireEvent.click(rendering.queryAllByText("Oui")[0]);
            })
        );
        it("doit afficher l'info bulle", () => {
          expect(
            rendering.queryByText(
              "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
            )
          ).toBeInTheDocument();
        });
        describe("Quand je clique sur la 2e réponse à la question type de contrat", () => {
          beforeEach(
            async () =>
              await act(async () => {
                await fireEvent.click(rendering.queryAllByText("Non")[0]);
              })
          );
          it("ne doit plus afficher l'info bulle", () => {
            expect(
              rendering.queryByText(
                "L’indemnité légale de licenciement n’est pas dûe en cas de faute grave."
              )
            ).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
