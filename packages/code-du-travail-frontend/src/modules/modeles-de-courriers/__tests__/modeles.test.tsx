import { push as matopush } from "@socialgouv/matomo-next";
import { fireEvent, render } from "@testing-library/react";
import { LetterModel } from "../modeles";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("<LetterModel />", () => {
  it("should send matomo event when firing copy event", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        slug={"mon-modele"}
        breadcrumbs={[]}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={undefined}
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

  it("should send not send event when typing anything", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        slug={"mon-modele"}
        breadcrumbs={[]}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={10}
        filename={""}
        html={undefined}
      />
    );
    fireEvent.keyDown(container, { key: "c" });
    fireEvent.keyDown(container, { key: "A", ctrlKey: true });
    fireEvent.keyDown(container, { key: "c", shitKey: true });

    expect(matopush).toHaveBeenCalledTimes(0);
  });
});
