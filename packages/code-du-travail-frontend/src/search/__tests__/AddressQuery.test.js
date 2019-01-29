import React from "react";
import { AddressQuery } from "../AddressQuery";
import { render, waitForElement } from "react-testing-library";
import { mockFetch } from "../../../test/mockFetch";

const bureau = {
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
};
const results = {
  hits: {
    total: 1,
    hits: [
      {
        _id: "id",
        _source: {
          ...bureau
        }
      }
    ]
  }
};
describe("<AddressQuery/>", () => {
  it("should render results with query", async () => {
    mockFetch(Promise.resolve(results));
    const { container, getByText } = render(
      <AddressQuery query="search test" />
    );
    await waitForElement(() => getByText(/bureau des légendes/i));
    expect(container).toMatchSnapshot();
  });
  it("should render results with coord", async () => {
    mockFetch(Promise.resolve(results));
    const lon = "lon";
    const lat = "lat";
    const { container, getByText } = render(
      <AddressQuery query="search test" coord={{ lon, lat }} />
    );
    await waitForElement(() => getByText(/bureau des légendes/i));
    expect(container).toMatchSnapshot();
  });
});
