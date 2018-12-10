import React from "react";
import { AddressResults } from "../AddressResults";
import { render } from "react-testing-library";

const results = [
  {
    id: "yolo",
    title: "Bureau des légendes",
    address: {
      lignes: ["adresse inconnue"],
      code: "00700",
      city: "Partout"
    },
    tel: "+00 000 000 000",
    email: "email"
  }
];
const emptyResults = [];

describe("<AddressResults/>", () => {
  it("should render no results", () => {
    const { container } = render(
      <AddressResults results={emptyResults} query="search address" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <AddressResults results={results} query="search address" />
    );
    expect(container).toMatchSnapshot();
  });
});
