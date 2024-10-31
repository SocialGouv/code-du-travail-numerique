import { push as matopush } from "@socialgouv/matomo-next";
import { fireEvent, render } from "@testing-library/react";
import { LetterModel } from "../modeles";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

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
        title="Mon modele"
        slug={"mon-modele"}
        breadcrumbs={[]}
        date={"12/02/2020"}
        intro={"Ceci est mon intro"}
        relatedItems={[]}
        metaDescription={"ma méta description"}
        filesize={10}
        filename={"mon-fichier.txt"}
        html="<p>Le modèle</p>"
      />
    );
    expect(
      getAllByText("Télécharger le Mon modele")[0].getAttribute("href")
    ).toEqual("bucket.url/default/mon-fichier.txt");

    expect(container).toMatchSnapshot();
  });
  it("envoi un event quand on déclenche une copie", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        breadcrumbs={[]}
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={""}
      />
    );

    fireEvent.copy(container);
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "page_modeles_de_documents",
      "type_CTRL_C",
      "mon-modele",
    ]);
  });
  it("should send matomo event when firing copy event", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        breadcrumbs={[]}
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={""}
      />
    );

    fireEvent.copy(container);
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "page_modeles_de_documents",
      "type_CTRL_C",
      "mon-modele",
    ]);
  });

  it("doit envoyer un event et appeler la méthode writeText de clipboard", async () => {
    const { getAllByTestId } = render(
      <LetterModel
        title="Mon modele"
        breadcrumbs={[]}
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html="<p>Hello</p>"
      />
    );

    getAllByTestId("copy-button")[0].click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "page_modeles_de_documents",
      "type_CTRL_C",
      "mon-modele",
    ]);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("n'envoi pas d'event si on tape d'autres touches", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        breadcrumbs={[]}
        slug={"mon-modele"}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={""}
      />
    );
    fireEvent.keyDown(container, { key: "c" });
    fireEvent.keyDown(container, { key: "A", ctrlKey: true });
    fireEvent.keyDown(container, { key: "c", shitKey: true });

    expect(matopush).toHaveBeenCalledTimes(0);
  });
});
