import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import Search from "../";

global.fetch = jest.fn();
jest.useFakeTimers();

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

function renderSearchForm({
  title = "Recherche de convention collective",
  onSelectConvention = jest.fn(),
} = {}) {
  return render(
    <Search title={title} onSelectConvention={onSelectConvention} />
  );
}

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

describe("<Search />", () => {
  it("should render", () => {
    const { container } = renderSearchForm({});
    expect(container).toMatchSnapshot();
  });

  it("should show spinner when loading", () => {
    mockFetch({ "api.url/idcc": {} });
    const { container, getByPlaceholderText } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "8888" } }
    );
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
                slug: "275-small-titre",
                title: "titre convention 1",
              },
            },
            {
              _source: {
                id: "KALICONT000000000002",
                num: 276,
                shortTitle: "smaller convention 2",
                slug: "276-smaller-convention-2",
                title: "titre convention 2",
              },
            },
          ],
        },
      },
    });
    const { container, getByPlaceholderText } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "1234" } }
    );
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
                slug: "275-small-titre",
                title: "titre convention 1",
              },
            },
            {
              _source: {
                id: "KALICONT000000000002",
                num: 4567,
                shortTitle: "smaller convention 2",
                slug: "4567-smaller-convention-2",
                title: "titre convention 2",
              },
            },
          ],
        },
      },
    });
    const { container, getByPlaceholderText } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "4567" } }
    );
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
    const { container, getByPlaceholderText, findByText } = renderSearchForm({
      onSelectConvention: null,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "9999" } }
    );
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
    const { getByPlaceholderText, getByText } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "42" } }
    );
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

  it("when searching by text, should use enterprise API", async () => {
    mockFetch({
      "api.url": {
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
    });

    const onSelectConvention = jest.fn();
    const { container, getByPlaceholderText } = renderSearchForm({
      onSelectConvention,
    });
    fireEvent.change(
      getByPlaceholderText(
        "Nom de la convention collective, de l’entreprise ou son SIRET"
      ),
      { target: { value: "hello" } }
    );
    jest.runOnlyPendingTimers(); // run debounce timer
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    expect(container).toMatchSnapshot();
  });
});
