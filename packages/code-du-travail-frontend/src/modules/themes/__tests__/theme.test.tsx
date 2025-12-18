import { sendEvent } from "@socialgouv/matomo-next";
import {
  fireEvent,
  getAllByRole,
  getByRole,
  render,
} from "@testing-library/react";
import { ThemeModel } from "../ThemeModel";
import { SOURCES } from "@socialgouv/cdtn-utils";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

const dataTheme = {
  title: "Theme 1",
  description: "Description du thème 1",
  slug: "theme1",
  children: [
    {
      label: "children 1",
      slug: "children1_1",
    },
    {
      label: "children 2",
      slug: "children1_2",
    },
  ],
  breadcrumbs: [
    {
      label: "Theme root 1",
      slug: "theme_root_1",
      position: 0,
    },
  ],
  refs: [
    {
      cdtnId: "",
      breadcrumbs: [],
      title: "Document 1",
      slug: "document_1",
      source: SOURCES.CCN,
      description: "Description du document 1",
    },
    {
      cdtnId: "",
      breadcrumbs: [],
      title: "Document 2",
      slug: "document_2",
      source: SOURCES.CCN,
      description: "Description du document 2",
    },
  ],
};

const dataThemeWithExternalRef = {
  ...dataTheme,
  refs: [
    ...dataTheme.refs,
    {
      cdtnId: "",
      breadcrumbs: [],
      title: "Document Externe",
      slug: "document_externe",
      source: "external",
      url: "https://example.com/document",
      description: "Description du document externe",
    },
  ],
};

describe("<ThemeModel />", () => {
  it("validation du contenu de la page d'un thème", () => {
    const { container } = render(<ThemeModel theme={dataTheme} />);
    const subThemesList = getAllByRole(container, "list")[1];
    const subThemes = getAllByRole(subThemesList, "listitem");
    expect(subThemes).toHaveLength(2);
    expect(getAllByRole(subThemes[0], "link")).toHaveLength(1);
    expect(getAllByRole(subThemes[0], "link")[0].getAttribute("href")).toEqual(
      "/themes/children1_1"
    );

    const documentList = getAllByRole(container, "list")[2];
    const documents = getAllByRole(documentList, "listitem");
    expect(documents).toHaveLength(2);
    expect(getAllByRole(documents[0], "link")).toHaveLength(1);
    expect(getAllByRole(documents[0], "link")[0].getAttribute("href")).toEqual(
      "/convention-collective/document_1"
    );
    const document1Title = getAllByRole(documents[0], "heading", {
      level: 2,
    })[0];
    expect(document1Title).toHaveTextContent("Document 1");

    fireEvent.click(getByRole(document1Title, "link"));

    expect(sendEvent).toHaveBeenCalledWith({
      category: "selectResult",
      action: `{"url":"/convention-collective/document_1"}`,
    });
  });

  it("affiche un thème", () => {
    const { container } = render(<ThemeModel theme={dataTheme} />);
    expect(container).toMatchSnapshot();
  });

  it("utilise l'URL externe pour les références avec source 'external'", () => {
    const { container } = render(
      <ThemeModel theme={dataThemeWithExternalRef as any} />
    );

    const documentList = getAllByRole(container, "list")[2];
    const documents = getAllByRole(documentList, "listitem");
    expect(documents).toHaveLength(3);

    // Vérifier que le troisième document (externe) a le bon lien
    const externalDocument = documents[2];
    expect(getAllByRole(externalDocument, "link")).toHaveLength(1);
    expect(
      getAllByRole(externalDocument, "link")[0].getAttribute("href")
    ).toEqual("https://example.com/document");

    const externalDocumentTitle = getAllByRole(externalDocument, "heading", {
      level: 2,
    })[0];
    expect(externalDocumentTitle).toHaveTextContent("Document Externe");

    fireEvent.click(getByRole(externalDocumentTitle, "link"));

    expect(sendEvent).toHaveBeenCalledWith({
      category: "selectResult",
      action: `{"url":"https://example.com/document"}`,
    });
  });
});
