import { render } from "@testing-library/react";
import { Share } from "../Share";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
  };
});
jest.mock("next/navigation", () => ({
  usePathname: () => "/my-page",
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

      expect(sendEvent).toHaveBeenCalledWith({
        category: "clic_share",
        action: "http://api.url/my-page",
        name: event,
      });
    }
  );

  it("n'affiche pas de bouton RSS sans flux", () => {
    const { queryByText } = render(
      <Share title="HELLO" metaDescription="Ceci est ma page" />
    );
    expect(queryByText("Flux RSS des actualités")).toBeNull();
  });

  it("affiche un bouton RSS quand un flux est fourni et le tracke au clic", () => {
    jest.resetAllMocks();
    const { getByText } = render(
      <Share
        title="HELLO"
        metaDescription="Ceci est ma page"
        rssFeed={{ href: "/actualite/rss.xml", title: "Actualités" }}
      />
    );
    const link = getByText("Flux RSS des actualités");
    expect(link).toHaveAttribute("href", "/actualite/rss.xml");
    expect(link).toHaveAttribute("title", "S'abonner au flux RSS : Actualités");
    expect(link.className).toContain("fr-icon-rss-line");
    link.click();
    expect(sendEvent).toHaveBeenCalledWith({
      category: "clic_share",
      action: "http://api.url/my-page",
      name: "rss",
    });
  });
});
