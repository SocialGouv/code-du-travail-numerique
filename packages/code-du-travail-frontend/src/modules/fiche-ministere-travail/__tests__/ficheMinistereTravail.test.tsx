import { getByRole, render } from "@testing-library/react";
import { FicheMinistereTravail } from "../ficheMinistereTravail";

const ficheMTData = {
  date: "05/04/2024",
  description: "Description MT",
  intro: "Intro MT",
  highlight: {
    anchor: "",
    html: "A savoir MT",
    title: "",
  },
  sections: [
    {
      anchor: "anchor1",
      html: "<p>Anchor content 1</p>",
      title: "Anchor title 1",
    },
    {
      anchor: "anchor2",
      html: "<p>Anchor content 2</p>",
      title: "Anchor title 2",
    },
    {
      anchor: "anchor3",
      html: "<p>Anchor content 3</p>",
      title: "Anchor title 3",
    },
  ],
  title: "Fiche MT title",
  url: "https://travail-emploi.gouv.fr/fiche",
};

describe("Content fiche MT", () => {
  test("should show all elements", () => {
    const { getByText, getAllByRole, getByRole } = render(
      <FicheMinistereTravail
        date={ficheMTData.date}
        metaDescription={ficheMTData.description}
        breadcrumbs={[]}
        sections={ficheMTData.sections}
        url={ficheMTData.url}
        highlight={ficheMTData.highlight}
        title={ficheMTData.title}
        intro={ficheMTData.intro}
        relatedItems={[]}
      />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Fiche MT title"
    );
    expect(getByText(/Intro MT/)).toBeInTheDocument();
    expect(getByText(/A savoir MT/)).toBeInTheDocument();
    expect(getByText(/Mis à jour le/)).toHaveTextContent("05/04/2024");
    expect(getByText(/Fiche Ministère du travail/)).toHaveAttribute(
      "href",
      "https://travail-emploi.gouv.fr/fiche"
    );
    expect(getAllByRole("heading", { level: 2 })[0]).toHaveTextContent(
      "Anchor title 1"
    );
    expect(
      getAllByRole("heading", { level: 2 })[0].parentElement
    ).toHaveTextContent("Anchor content 1");
    expect(getAllByRole("heading", { level: 2 })[1]).toHaveTextContent(
      "Anchor title 2"
    );
    expect(
      getAllByRole("heading", { level: 2 })[1].parentElement
    ).toHaveTextContent("Anchor content 2");
    expect(getAllByRole("heading", { level: 2 })[2]).toHaveTextContent(
      "Anchor title 3"
    );
    expect(
      getAllByRole("heading", { level: 2 })[2].parentElement
    ).toHaveTextContent("Anchor content 3");
  });
});
