import React from "react";
import { AddressResults } from "../AddressResults";
import { render } from "../../../test/utils";

const results = [
  {
    id: "yolo",
    title: "Bureau des légendes",
    address: {
      lignes: ["adresse inconnue"],
      code: "00700",
      city: "Partout"
    },
    coord: {
      lat: 4,
      lon: 44
    },
    tel: "+00 000 000 000",
    email: "email"
  }
];
const emptyResults = [];

describe("<AddressResults/>", () => {
  it("should render no results", () => {
    const { container } = render(
      <AddressResults
        results={emptyResults}
        query="search address"
        source="tous"
        url="search.url/fiches/doc1"
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <AddressResults
        results={results}
        query="search address"
        source="tous"
        url="search.url/fiches/doc1"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
