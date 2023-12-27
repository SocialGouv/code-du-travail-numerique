import { render } from "@testing-library/react";
import DisplayContentContribution from "../DisplayContentContribution";
import { ReferencesJuridiques } from "../References";

describe("ReferencesJuridiques", () => {
  it(`doit retourner null si pas de références`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques references={[]}></ReferencesJuridiques>
    );

    expect(asFragment().firstChild).toBeNull();
  });
  it(`doit mettre les références sans lien à la fin`, () => {
    const { asFragment } = render(
      <ReferencesJuridiques
        references={[
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
        ]}
      ></ReferencesJuridiques>
    );

    expect(asFragment().firstChild).toMatchInlineSnapshot(`
      <div
        class="sc-iGgWBj cRLRjd"
      >
        <div>
          <button
            aria-expanded="false"
            class="sc-kOPcWz ezOCpB sc-bbSZdi jpCDWv"
            type="button"
          >
            <svg
              aria-hidden="true"
              class="sc-imWYAI gTeNha"
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
              aria-level="2"
              class="sc-fBWQRz lqUBb"
              font-size="hsmall"
              font-weight="600"
              role="heading"
            >
              Références
            </span>
          </button>
          <div
            class="sc-fjvvzt gtrYRc"
          >
            <ul
              class="sc-cfxfcM sc-lnPyaJ kMmTaI iUscuO"
            >
              <li>
                <a
                  aria-label="Titre 2 (Nouvelle fenêtre)"
                  class="sc-bmzYkS hFAanY sc-iXzfSG dyqFrk no-after"
                  href="http://lien2"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    class="sc-dtBdUo hpIOmX"
                    fill="none"
                    viewBox="0 0 28 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m27.875 7.153-6-6.284a.526.526 0 0 0-.711-.023.496.496 0 0 0-.024.688l5.204 5.468H.5c-.276 0-.5.217-.5.484s.224.483.5.483h25.844l-5.204 5.469a.493.493 0 0 0 .024.687.52.52 0 0 0 .711-.023l6-6.284a.506.506 0 0 0 0-.665z"
                      fill="currentColor"
                    />
                  </svg>
                  <p
                    class="sc-iHGNWf hQSWKy"
                  >
                    Titre 2
                  </p>
                </a>
              </li>
              <li>
                <a
                  aria-label="Titre 5 (Nouvelle fenêtre)"
                  class="sc-bmzYkS hFAanY sc-iXzfSG dyqFrk no-after"
                  href="http://lien4"
                  target="_blank"
                >
                  <svg
                    aria-hidden="true"
                    class="sc-dtBdUo hpIOmX"
                    fill="none"
                    viewBox="0 0 28 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m27.875 7.153-6-6.284a.526.526 0 0 0-.711-.023.496.496 0 0 0-.024.688l5.204 5.468H.5c-.276 0-.5.217-.5.484s.224.483.5.483h25.844l-5.204 5.469a.493.493 0 0 0 .024.687.52.52 0 0 0 .711-.023l6-6.284a.506.506 0 0 0 0-.665z"
                      fill="currentColor"
                    />
                  </svg>
                  <p
                    class="sc-iHGNWf hQSWKy"
                  >
                    Titre 5
                  </p>
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
