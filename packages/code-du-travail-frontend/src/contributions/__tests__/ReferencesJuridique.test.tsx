import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";
import { ReferencesJuridiques } from "../References";

describe("ReferencesJuridiques", () => {
  it(`doit retourner null si pas de références`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques references={[]}></ReferencesJuridiques>,
    );

    expect(asFragment().firstChild).toBeNull();
  });
  it(`doit mettre les références sans lien à la fin`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques
        references={
          [
            {
              url: null,
              title: "Titre 1",
            },
            {
              title: "Titre 2",
              url: "http://lien2",
            },
            {
              url: undefined,
              title: "Titre 3",
            },
            {
              title: "Titre 4",
            },
            {
              title: "Titre 5",
              url: "http://lien4",
            },
          ] as any
        }
      ></ReferencesJuridiques>,
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-2a0a4b0a-0 hPfzrL"
      >
        <div>
          <button
            aria-expanded="false"
            class="sc-95bd4344-0 kEXnui sc-da0440cf-1 fwhlXZ"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="sc-93c68677-0 fWneNg"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline
                points="9 18 15 12 9 6"
              />
            </svg>
            <span
              class="sc-da0440cf-2 cdlSfE"
            >
              Références
            </span>
          </button>
          <div
            class="sc-da0440cf-0 kQbZar"
          >
            <ul
              class="sc-ab356c14-0 sc-ab4aba5d-1 bpNHPl dDdmoO"
            >
              <li>
                <a
                  aria-label="Titre 2 (Nouvelle fenêtre)"
                  class="sc-60a7e89-0 haggkt sc-ab4aba5d-0 gOxGeu no-after"
                  href="http://lien2"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    class="sc-60a7e89-2 bJDpVh"
                    fill="none"
                    viewBox="0 0 28 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m27.875 7.153-6-6.284a.526.526 0 0 0-.711-.023.496.496 0 0 0-.024.688l5.204 5.468H.5c-.276 0-.5.217-.5.484s.224.483.5.483h25.844l-5.204 5.469a.493.493 0 0 0 .024.687.52.52 0 0 0 .711-.023l6-6.284a.506.506 0 0 0 0-.665z"
                      fill="currentColor"
                    />
                  </svg>
                  <span
                    class="sc-60a7e89-1 eSlLWj"
                  >
                    Titre 2
                  </span>
                </a>
              </li>
              <li>
                <a
                  aria-label="Titre 5 (Nouvelle fenêtre)"
                  class="sc-60a7e89-0 haggkt sc-ab4aba5d-0 gOxGeu no-after"
                  href="http://lien4"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    class="sc-60a7e89-2 bJDpVh"
                    fill="none"
                    viewBox="0 0 28 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m27.875 7.153-6-6.284a.526.526 0 0 0-.711-.023.496.496 0 0 0-.024.688l5.204 5.468H.5c-.276 0-.5.217-.5.484s.224.483.5.483h25.844l-5.204 5.469a.493.493 0 0 0 .024.687.52.52 0 0 0 .711-.023l6-6.284a.506.506 0 0 0 0-.665z"
                      fill="currentColor"
                    />
                  </svg>
                  <span
                    class="sc-60a7e89-1 eSlLWj"
                  >
                    Titre 5
                  </span>
                </a>
              </li>
              <li>
                <div>
                  Titre 1
                </div>
              </li>
              <li>
                <div>
                  Titre 3
                </div>
              </li>
              <li>
                <div>
                  Titre 4
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `);
  });
});
