import { render } from "@testing-library/react";
import { Share } from "../Share";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
  };
});
// Le partage vit sur toutes les pages de contenu : on se place sur une
// contribution pour vérifier que la catégorie suit le type de page.
jest.mock("next/navigation", () => ({
  usePathname: () => "/contribution/my-page",
}));

describe("<Share />", () => {
  it("renders", () => {
    const { container } = render(
      <Share title="HELLO" metaDescription="Ceci est ma page" />
    );
    expect(container).toMatchSnapshot();
  });

  it.each`
    linkText                      | event
    ${"Facebook"}                 | ${"facebook"}
    ${"X (anciennement Twitter)"} | ${"twitter"}
    ${"Linkedin"}                 | ${"linkedin"}
    ${"Courriel"}                 | ${"email"}
    ${"Whatsapp"}                 | ${"whatsapp"}
    ${"Lien de copie"}            | ${"copier"}
  `(
    "should track when click on link $linkText",
    async ({ linkText, event }) => {
      jest.resetAllMocks();

      const { getByText } = render(
        <Share title="HELLO" metaDescription="Ceci est ma page" />
      );
      const link = getByText(linkText);
      link.click();

      // L'ancien schéma faisait de l'URL complète l'ACTION et du réseau le nom,
      // sous une catégorie `clic_share` qui décrivait l'interaction. Désormais :
      // catégorie = type de page, action = interaction, contexte en payload.
      expect(sendEvent).toHaveBeenCalledWith({
        category: "contribution",
        action: "click_share",
        name: `{"path":"contribution/my-page","network":"${event}"}`,
      });
    }
  );
});
