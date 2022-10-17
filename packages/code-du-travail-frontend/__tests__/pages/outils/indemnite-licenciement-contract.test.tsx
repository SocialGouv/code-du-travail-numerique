import {
  default as Outils,
  getServerSideProps,
  Props,
} from "../../../pages/outils/[slug]";

import { act } from "react-dom/test-utils";
import { render, fireEvent, RenderResult } from "@testing-library/react";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ relatedItems: [] }),
  })
) as jest.Mock;

describe("Quand j'arrive sur l'outil d'idemnité licenciement", () => {
  let rendering;
  let props: Props;
  beforeAll(async () => {
    //@ts-ignore
    const result: any = await getServerSideProps({
      query: { slug: "indemnite-licenciement" },
    });
    props = result.props;
  });
  beforeEach(async () => {
    await act(async () => {
      rendering = await render(<Outils {...props} />);
    });
  });
  it("doit afficher l'intro", () => {
    expect(
      rendering.queryByText("Calculer l'indemnité de licenciement")
    ).toBeInTheDocument();
    expect(rendering.queryByText("Commencer")).toBeInTheDocument();
  });
  describe("Quand je clique sur le bouton commencer", () => {
    beforeEach(
      async () =>
        await act(async () => {
          await fireEvent.click(rendering.queryByText("Commencer"));
        })
    );
    it("doit afficher les questions & réponses de la partie contrat", () => {
      expect(
        rendering.queryByText("Quel est le type du contrat de travail ?")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText(
          "Contrat à durée determiné (CDD) ou contrat d’intérim"
        )
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Contrat à durée indeterminé (CDI)")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText(
          "Le licenciement est-il dû à une faute grave (ou lourde) ?"
        )
      ).toBeInTheDocument();
      expect(rendering.queryAllByText("Oui")[0]).toBeInTheDocument();
      expect(rendering.queryAllByText("Non")[0]).toBeInTheDocument();
      expect(
        rendering.queryByText(
          "Le licenciement est-il dû à une inaptitude suite à un accident du travail ou maladie professionnelle reconnue ?"
        )
      ).toBeInTheDocument();
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
