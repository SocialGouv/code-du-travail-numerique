import { render, within } from "@testing-library/react";
import { FicheServicePublicContainer } from "../FicheServicePublicContainer";
import { ServicePublicReference } from "@socialgouv/cdtn-types";
import { FicheSPData } from "../builder/type";

const rawData: FicheSPData = {
  children: [
    {
      text: "Vous pouvez être en arrêt de travail pour maladie durant votre préavis (de démission, de licenciement, etc.). Vous percevez alors les ",
      type: "text",
    },
  ],
  name: "Paragraphe",
  type: "element",
};
const ref: ServicePublicReference = {
  title: "My reference",
  url: "www.hello.com",
  type: "external",
};
const ficheSPData = {
  breadcrumbs: [
    {
      label: "Santé, sécurité et conditions de travail",
      position: 6,
      slug: "/themes/sante-securite-et-conditions-de-travail",
    },
    {
      label: "Santé au travail",
      position: 3,
      slug: "/themes/sante-au-travail",
    },
    {
      label: "Maladie",
      position: 1,
      slug: "/themes/maladie",
    },
  ],
  date: "09/10/2019",
  metaDescription: "My meta description",
  raw: {
    children: [rawData],
    attributes: {},
    name: "Description",
    type: "element",
  },
  referencedTexts: [ref],
  slug: "arret-maladie-pendant-le-preavis-quelles-consequences",
  title: "Fiche SP title",
  url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2614",
};

describe("Content fiche SP", () => {
  test("should show all elements", () => {
    const { getByText, getAllByText, getAllByRole, getByRole } = render(
      <FicheServicePublicContainer relatedItems={[]} {...ficheSPData} />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Fiche SP title"
    );
    expect(getByText(/Mis à jour le/)).toHaveTextContent("09/10/2019");
    expect(getByText(/Fiche service-public.gouv.fr/)).toHaveAttribute(
      "href",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2614"
    );
    // Le libellé du thème racine apparaît dans le fil d'ariane et dans le tag
    getAllByText(/Santé, sécurité et conditions de travail/).forEach((link) =>
      expect(link).toHaveAttribute(
        "href",
        "/themes/sante-securite-et-conditions-de-travail"
      )
    );
    expect(getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
      "Références juridiques concernées"
    );
  });

  test("should show theme tags linking to the root theme and sub theme", () => {
    const { container } = render(
      <FicheServicePublicContainer relatedItems={[]} {...ficheSPData} />
    );

    const tagsGroup = container.querySelector("ul.fr-tags-group");
    expect(tagsGroup).toBeInTheDocument();
    const tags = within(tagsGroup as HTMLElement).getAllByRole("link");
    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent(
      "Santé, sécurité et conditions de travail"
    );
    expect(tags[0]).toHaveAttribute(
      "href",
      "/themes/sante-securite-et-conditions-de-travail"
    );
    expect(tags[1]).toHaveTextContent("Maladie");
    expect(tags[1]).toHaveAttribute("href", "/themes/maladie");
  });
});
