import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { fireEvent, render, within } from "@testing-library/react";
import { LetterModel } from "../LetterModel";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
  };
});

// La catégorie et le chemin de l'event viennent de la route courante : le slug
// du modèle n'a plus besoin d'être passé à l'émetteur, il EST le chemin. On ne
// surcharge `usePathname` que dans les tests de tracking, pour ne pas déplacer
// les snapshots pour une raison sans rapport.
const PAGE = "/modeles-de-courriers/mon-modele";

const COPY_EVENT = {
  category: "modeles-de-courriers",
  action: "copy_letter_template",
  name: '{"path":"modeles-de-courriers/mon-modele"}',
};

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("<LetterModel />", () => {
  it("affiche un modèle de document", () => {
    const { container, getAllByText } = render(
      <LetterModel
        breadcrumbs={[]}
        title="Mon modele"
        slug={"mon-modele"}
        date={"12/02/2020"}
        intro={"Ceci est mon intro"}
        relatedItems={[]}
        metaDescription={"ma méta description"}
        filesize={10}
        filename={"mon-fichier.txt"}
        extension={"txt"}
        html="<p>Le modèle</p>"
      />
    );
    expect(
      getAllByText("Télécharger le Mon modele")[0].getAttribute("href")
    ).toEqual("bucket.url/preview/default/mon-fichier.txt");

    expect(container).toMatchSnapshot();
  });
  it("envoi un event quand on déclenche une copie", () => {
    (usePathname as jest.Mock).mockReturnValue(PAGE);
    const { container } = render(
      <LetterModel
        breadcrumbs={[]}
        title="Mon modele"
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={""}
        extension={""}
      />
    );

    fireEvent.copy(container);
    expect(sendEvent).toHaveBeenCalledWith(COPY_EVENT);
  });
  it("should send matomo event when firing copy event", () => {
    (usePathname as jest.Mock).mockReturnValue(PAGE);
    const { container } = render(
      <LetterModel
        breadcrumbs={[]}
        title="Mon modele"
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        extension={""}
        html={""}
      />
    );

    fireEvent.copy(container);
    expect(sendEvent).toHaveBeenCalledWith(COPY_EVENT);
  });

  it("doit envoyer un event et appeler la méthode writeText de clipboard", async () => {
    (usePathname as jest.Mock).mockReturnValue(PAGE);
    const { getAllByTestId } = render(
      <LetterModel
        breadcrumbs={[]}
        title="Mon modele"
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        extension={""}
        html="<p>Hello</p>"
      />
    );

    getAllByTestId("copy-button")[0].click();

    expect(sendEvent).toHaveBeenCalledWith(COPY_EVENT);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("n'envoi pas d'event si on tape d'autres touches", () => {
    const { container } = render(
      <LetterModel
        breadcrumbs={[]}
        title="Mon modele"
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        extension={""}
        html={""}
      />
    );
    fireEvent.keyDown(container, { key: "c" });
    fireEvent.keyDown(container, { key: "A", ctrlKey: true });
    fireEvent.keyDown(container, { key: "c", shitKey: true });

    expect(sendEvent).toHaveBeenCalledTimes(0);
  });

  describe("fil d'Ariane", () => {
    const renderWithThemes = () =>
      render(
        <LetterModel
          breadcrumbs={[
            {
              label: "Départ de l'entreprise",
              position: 1,
              slug: "/themes/depart",
            },
          ]}
          title="Mon modele"
          slug={"mon-modele"}
          date={"12/02/2020"}
          intro={"Ceci est mon intro"}
          relatedItems={[]}
          metaDescription={"ma méta description"}
          filesize={10}
          filename={"mon-fichier.txt"}
          extension={"txt"}
          html="<p>Le modèle</p>"
        />
      );

    it("remonte vers la page qui regroupe les modèles, pas vers le thème", () => {
      const { getByRole } = renderWithThemes();
      const nav = getByRole("navigation");

      expect(
        within(nav).getByRole("link", { name: "Modèles de documents" })
      ).toHaveAttribute("href", "/modeles-de-courriers");
      expect(
        within(nav).queryByRole("link", { name: "Départ de l'entreprise" })
      ).toBeNull();
    });

    it("décrit le même chemin dans le JSON-LD", () => {
      const { container } = renderWithThemes();
      const jsonLd = container.querySelector(
        "#jsonld-breadcrumbs"
      )?.textContent;

      expect(jsonLd).not.toContain("[object Object]");
      expect(JSON.parse(jsonLd ?? "{}").itemListElement).toEqual([
        expect.objectContaining({ position: 1, name: "Accueil" }),
        expect.objectContaining({
          position: 2,
          name: "Modèles de documents",
          item: "http://api.url/modeles-de-courriers",
        }),
        expect.objectContaining({ position: 3, name: "Mon modele" }),
      ]);
    });
  });
});
