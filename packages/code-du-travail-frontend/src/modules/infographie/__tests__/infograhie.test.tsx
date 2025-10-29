import React from "react";
import { render } from "@testing-library/react";
import { Infographie } from "../Infographie";

describe("infographie", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("rend une page infographie", async () => {
    const infographic = {
      date: "14/08/2024",
      meta_title: "Meta titre de l'infographie",
      description: "Description de l'infographie",
      pdf: {
        filename: "info.pdf",
        sizeOctet: "4720000",
      },
      svgFilename: "ruptureconventionnelle.svg",
      transcription: "Transcription de l'infographie",
      meta_description: "Meta description del 'infographie'",
      breadcrumbs: [],
      title: "Titre de la description",
    };

    const { getByRole, getAllByRole, getByText, getAllByText } = render(
      <Infographie infographic={infographic} />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Titre de la description"
    );
    const h2 = getAllByRole("heading", { level: 2 });
    expect(h2).toHaveLength(5);
    expect(h2[0]).toHaveTextContent("Télécharger l'infographie");
    expect(getByText("Description de l'infographie")).toBeInTheDocument();
    const downloadLink = getAllByRole("link", {
      name: "Télécharger l'infographie",
    });
    expect(downloadLink).toHaveLength(2);
    expect(downloadLink[0]).toHaveProperty(
      "href",
      "http://localhost/bucket.url/preview/default/info.pdf"
    );
    expect(downloadLink[1]).toHaveProperty(
      "href",
      "http://localhost/bucket.url/preview/default/info.pdf"
    );
    const pdf = getAllByText("Format PDF - 4,72 Mo", {
      exact: false,
      normalizer: (s) => s.replace(/\s+/g, " ").trim(),
    });
    expect(pdf).toHaveLength(2);
    expect(getByText("Transcription de l'infographie")).toBeInTheDocument();
    expect(
      getByRole("img", {
        name: "infographie Titre de la description. Description détaillée ci-après.",
      })
    ).toHaveProperty(
      "src",
      "http://localhost/bucket.url/preview/default/ruptureconventionnelle.svg"
    );
  });
});
