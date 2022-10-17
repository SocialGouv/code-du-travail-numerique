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

describe.each([
  {
    slug: "indemnite-licenciement",
  },
])(
  `Etant donné les paramètres:
        - slug: $slug,
    `,
  ({ slug }) => {
    describe("Quand j'arrive sur l'outil d'idemnité licenciement", () => {
      let rendering;
      beforeEach(async () => {
        await act(async () => {
          // @ts-ignore
          const { props }: Props = await getServerSideProps({
            query: { slug },
          });
          rendering = await render(<Outils {...props} />);
        });
      });
      describe("Quand je réponds aux questions du contrat de travail", () => {
        beforeEach(async () => {
          await act(async () => {
            await fireEvent.click(rendering?.queryByText("Commencer"));
            await fireEvent.click(
              rendering.queryByText("Contrat à durée indeterminé (CDI)")
            );
            await fireEvent.click(rendering.queryAllByText("Non")[0]);
            await fireEvent.click(rendering.queryAllByText("Non")[1]);
            await fireEvent.click(rendering.queryByText("Suivant"));
          });
        });
        it("doit afficher la question sur la connaissance de la cc", () => {
          expect(
            rendering.queryByText(
              "Quel est le nom de la convention collective applicable ?"
            )
          ).toBeInTheDocument();
        });
        describe("Quand je clique sur 'je sais'", () => {
          beforeEach(async () => {
            await act(async () => {
              await fireEvent.click(
                rendering.queryByText(
                  "Je sais quelle est ma convention collective (je la saisis)"
                )
              );
            });
          });
          it("doit afficher la partie de sélection de cc", () => {
            expect(
              rendering.queryByText(
                "Précisez et sélectionnez votre convention collective"
              )
            ).toBeInTheDocument();
            // expect(
            //   rendering.getByRole("input", { name: "agreement-search" })
            // ).toBeInTheDocument();
          });
        });
      });
    });
  }
);
