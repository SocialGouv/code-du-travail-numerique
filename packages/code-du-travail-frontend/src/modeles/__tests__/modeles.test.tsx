import { push as matopush } from "@socialgouv/matomo-next";
import { fireEvent, render } from "@testing-library/react";
import { LetterModel } from "../modeles";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

describe("<LetterModel />", () => {
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
        filesize={undefined}
        filename={""}
        html={undefined}
        meta_title={""}
        type={undefined}
      />
    );
    fireEvent.keyDown(container, { key: "c" });
    fireEvent.keyDown(container, { key: "A", ctrlKey: true });
    fireEvent.keyDown(container, { key: "c", shitKey: true });

    expect(matopush).toHaveBeenCalledTimes(0);
  });
  it("should send matomo event when typing CTRL + C", () => {
    const { container } = render(
      <LetterModel
        title="Mon modele"
        slug={"mon-modele"}
        breadcrumbs={[]}
        date={""}
        intro={""}
        relatedItems={[]}
        metaDescription={""}
        filesize={undefined}
        filename={""}
        html={undefined}
        meta_title={""}
        type={undefined}
      />
    );
    fireEvent.keyDown(container, { key: "c", ctrlKey: true });
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "page_modeles_de_documents",
      "type_CTRL_C",
      "mon-modele",
    ]);
  });
});
