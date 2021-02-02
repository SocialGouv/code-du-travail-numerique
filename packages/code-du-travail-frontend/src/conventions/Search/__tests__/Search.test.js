// import { fireEvent, render, waitFor } from "@testing-library/react";
import { render } from "@testing-library/react";
// import fetch from "isomorphic-unfetch";
import React from "react";

import Search from "../";

jest.mock("isomorphic-unfetch");
jest.useFakeTimers();

jest.mock("../../../piwik", () => ({
  matopush: jest.fn(),
}));

function renderSearchForm({
  title = "Recherche de convention collective",
  onSelectConvention = jest.fn(),
} = {}) {
  return render(
    <Search title={title} onSelectConvention={onSelectConvention} />
  );
}

/*
const mockFetch = (resultsByService) => {
  fetch.mockReset();
  fetch.mockImplementation((url) => {
    const mockFetchResponse = (data) =>
      Promise.resolve({ json: () => Promise.resolve(data), ok: true });

    for (const [service, data] of Object.entries(resultsByService)) {
      if (new RegExp(service).test(url)) {
        return mockFetchResponse(data);
      }
    }
    return Promise.resolve({ ok: false });
  });
};
*/

describe("<Search />", () => {
  it("should render", () => {
    const { container } = renderSearchForm({});
    expect(container).toMatchSnapshot();
  });
  /*

  it("should show spinner when loading", () => {
    mockFetch({ "api.url/idcc": {} });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(getByRole("search"), { target: { value: "8888" } });
    expect(container).toMatchSnapshot();
  });

  it("when input is IDCC, should search conventions", async () => {
    mockFetch({
      "api.url/idcc": {
        hits: {
          hits: [
            {
              _source: {
                id: "KALICONT000000000001",
                num: 275,
                shortTitle: "small titre",
                slug: "slug-convention-1",
                title: "titre convention 1",
              },
            },
            {
              _source: {
                id: "KALICONT000000000002",
                num: 276,
                shortTitle: "smaller convention 2",
                slug: "slug-convention-2",
                title: "titre convention 2",
              },
            },
          ],
        },
      },
    });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(getByRole("search"), { target: { value: "1234" } });
    jest.runAllTimers();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=1234");
    expect(container).toMatchSnapshot();
  });

  it("when input is a valid IDCC, should show only the perfect match", async () => {
    mockFetch({
      "api.url/idcc": {
        hits: {
          hits: [
            {
              _source: {
                id: "KALICONT000000000001",
                num: 275,
                shortTitle: "small titre",
                slug: "slug-convention-1",
                title: "titre convention 1",
              },
            },
            {
              _source: {
                id: "KALICONT000000000002",
                num: 4567,
                shortTitle: "smaller convention 2",
                slug: "slug-convention-2",
                title: "titre convention 2",
              },
            },
          ],
        },
      },
    });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(getByRole("search"), { target: { value: "4567" } });
    jest.runAllTimers();
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=4567");
    expect(container).toMatchSnapshot();
  });

  it("should show no results when no result", async () => {
    mockFetch({
      "api.url/idcc": {
        hits: {
          hits: [],
        },
      },
    });
    const { container, getByRole, findByText } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(getByRole("search"), { target: { value: "9999" } });
    jest.runAllTimers();
    await waitFor(() => findByText(/Aucun résultat/i), { container });
    expect(container).toMatchSnapshot();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=9999");
  });

  it("should use onSelectConvention callback when given", async () => {
    mockFetch({
      "api.url/idcc": {
        hits: {
          hits: [
            {
              _source: {
                id: "KALICONT000000000001",
                num: 275,
                shortTitle: "small titre",
                slug: "slug-convention-1",
                title: "titre convention 1",
              },
            },
            {
              _source: {
                id: "KALICONT000000000002",
                num: 4567,
                shortTitle: "smaller convention 2",
                slug: "slug-convention-2",
                title: "titre convention 2",
              },
            },
          ],
        },
      },
    });
    const onSelectConvention = jest.fn();
    const { getByRole, getByText } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(getByRole("search"), { target: { value: "42" } });
    jest.runAllTimers();
    await waitFor(() => expect(onSelectConvention).toHaveBeenCalledTimes(0));
    const link = getByText("smaller convention 2");
    fireEvent.click(link);
    expect(onSelectConvention).toHaveBeenCalledTimes(1);
    expect(onSelectConvention).toHaveBeenCalledWith({
      id: "KALICONT000000000002",
      num: 4567,
      shortTitle: "smaller convention 2",
      slug: "slug-convention-2",
      title: "titre convention 2",
    });
  });

  it("when searching by text, should use ES, api SIREN and siret2idcc", async () => {
    mockFetch({
      "api-entreprises.url": {
        etablissement: [
          {
            code_postal: 93100,
            id: 199308119,
            libelle_commune: "Commune test",
            nom_raison_sociale: "Entreprise 1",
            siret: "44144914700020",
          },
        ],
      },
      "api.url/idcc": {
        hits: {
          hits: [
            {
              _source: {
                id: "KALICONT000000000001",
                num: 275,
                shortTitle: "titre convention 1",
                slug: "slug-convention-1",
                title: "titre convention 1",
              },
            },
          ],
        },
      },
      "siret2idcc.url": [
        {
          conventions: [
            {
              active: true,
              date_publi: "1976-04-01T00:00:00.000Z",
              etat: "VIGUEUR_ETEN",
              id: "KALICONT000005635886",
              nature: "IDCC",
              num: 843,
              shortTitle: "Short Convention 1",
              title: "Convention 1",
            },
          ],
          siret: "44144914700020",
        },
      ],
    });

    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(getByRole("search"), { target: { value: "hello" } });
    jest.runOnlyPendingTimers(); // run debounce timer
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    expect(container).toMatchSnapshot();
  });


  it("should not use siret2idcc when no entreprise result", async () => {
    mockFetch({
      "api.url/idcc": {
        hits: {
          hits: [
            {
              _source: {
                id: "KALICONT000000000001",
                num: 275,
                shortTitle: "small title 1",
                slug: "slug-convention-1",
                title: "titre convention 1",
              },
            },
          ],
        },
      },
      "entreprise.data.gouv.fr": {
        message: "no results found",
      },
    });

    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(getByRole("search"), { target: { value: "xxxx" } });
    jest.runOnlyPendingTimers(); // run debounce timer
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(container).toMatchSnapshot();
  });

  it("when searching SIRET, should use API SIREN and siret2idcc", async () => {
    mockFetch({
      "api-entreprises": {
        etablissement: {
          code_postal: 93100,
          id: 199308119,
          libelle_commune: "Commune test",
          nom_raison_sociale: "Entreprise 1",
          siret: "01234567891011",
        },
      },
      "siret2idcc.url": [
        {
          conventions: [
            {
              active: true,
              date_publi: "1976-04-01T00:00:00.000Z",
              etat: "VIGUEUR_ETEN",
              id: "KALICONT000005635886",
              nature: "IDCC",
              num: "843",
              title: "Convention 1",
            },
          ],
          siret: "01234567891011",
        },
      ],
    });

    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(getByRole("search"), {
      target: { value: "01234567891011" },
    });
    jest.runOnlyPendingTimers(); // run debounce timer
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(container).toMatchSnapshot();
  });

  it("when searching SIREN, should use API SIREN and siret2idcc", async () => {
    mockFetch({
      "api-entreprises": {
        unite_legale: {
          denomination: "Entreprise 2",
          etablissements: [
            {
              code_postal: 93100,
              id: 199308120,
              libelle_commune: "Commune test 1",
              siret: "01234567891011",
            },
            {
              code_postal: 93120,
              etat_administratif: "F",
              id: 199308121,
              libelle_commune: "Commune test 2",
              siret: "01234567891012",
            },
          ],
        },
      },
      "siret2idcc.url": [
        {
          conventions: [
            {
              active: true,
              date_publi: "1976-04-01T00:00:00.000Z",
              etat: "VIGUEUR_ETEN",
              id: "KALICONT000005635886",
              nature: "IDCC",
              num: "843",
              title: "Convention 1",
            },
          ],
          siret: "01234567891011",
        },
        {
          conventions: [],
          siret: "01234567891012",
        },
      ],
    });

    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(getByRole("search"), {
      target: { value: "012345678" },
    });
    jest.runOnlyPendingTimers(); // run debounce timer
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(container).toMatchSnapshot();
  });
  */
});
