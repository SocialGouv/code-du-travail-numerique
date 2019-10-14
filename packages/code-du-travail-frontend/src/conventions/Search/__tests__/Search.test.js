import React from "react";
import { fireEvent, render, wait } from "@testing-library/react";
import fetch from "isomorphic-unfetch";

jest.mock("isomorphic-unfetch");
jest.useFakeTimers();

import Search from "../Form";

afterEach(() => {
  fetch.mockReset();
});

function renderSearchForm({
  title = "Recherche de convention collective",
  resetOnClick = true,
  onSelectConvention = jest.fn()
} = {}) {
  return render(
    <Search
      title={title}
      resetOnClick={resetOnClick}
      onSelectConvention={onSelectConvention}
    />
  );
}

const fetchMock = results =>
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(results)
  });

describe("<Search />", () => {
  it("should render", () => {
    const { container } = renderSearchForm({});
    expect(container).toMatchSnapshot();
  });

  it("should show spinner when loading", () => {
    fetchMock({});
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null
    });
    fireEvent.change(getByRole("search"), { target: { value: "8888" } });
    expect(container).toMatchSnapshot();
  });

  it("when input is IDCC, should search conventions", async () => {
    fetchMock({
      hits: {
        hits: [
          {
            _source: {
              idcc: "275",
              id: "KALICONT000000000001",
              title: "titre convention 1",
              slug: "slug-convention-1"
            }
          },
          {
            _source: {
              idcc: "276",
              id: "KALICONT000000000002",
              title: "titre convention 2",
              slug: "slug-convention-2"
            }
          }
        ]
      }
    });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null
    });
    fireEvent.change(getByRole("search"), { target: { value: "1234" } });
    jest.runAllTimers();
    await wait();
    expect(container).toMatchSnapshot();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=1234");
  });

  it("when input is a valid IDCC, should show only the perfect match ", async () => {
    fetchMock({
      hits: {
        hits: [
          {
            _source: {
              idcc: "275",
              id: "KALICONT000000000001",
              title: "titre convention 1",
              slug: "slug-convention-1"
            }
          },
          {
            _source: {
              idcc: "4567",
              id: "KALICONT000000000002",
              title: "titre convention 2",
              slug: "slug-convention-2"
            }
          }
        ]
      }
    });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null
    });
    fireEvent.change(getByRole("search"), { target: { value: "4567" } });
    jest.runAllTimers();
    await wait();
    expect(container).toMatchSnapshot();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=4567");
  });

  it("should show no results when no result", async () => {
    fetchMock({
      hits: {
        hits: []
      }
    });
    const { container, getByRole } = renderSearchForm({
      onSelectConvention: null
    });
    fireEvent.change(getByRole("search"), { target: { value: "9999" } });
    jest.runAllTimers();
    await wait();
    expect(container).toMatchSnapshot();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("api.url/idcc?q=9999");
  });

  it("should use onSelectConvention callback when given", async () => {
    fetchMock({
      hits: {
        hits: [
          {
            _source: {
              idcc: "275",
              id: "KALICONT000000000001",
              title: "titre convention 1",
              slug: "slug-convention-1"
            }
          },
          {
            _source: {
              idcc: "4567",
              id: "KALICONT000000000002",
              title: "titre convention 2",
              slug: "slug-convention-2"
            }
          }
        ]
      }
    });
    const onSelectConvention = jest.fn();
    const { getByRole, getByText } = renderSearchForm({
      onSelectConvention
    });
    fireEvent.change(getByRole("search"), { target: { value: "42" } });
    jest.runAllTimers();
    await wait();
    expect(onSelectConvention).toHaveBeenCalledTimes(0);
    const link = getByText("titre convention 2");
    fireEvent.click(link);
    expect(onSelectConvention).toHaveBeenCalledTimes(1);
    expect(onSelectConvention).toHaveBeenCalledWith({
      id: "KALICONT000000000002",
      num: "4567",
      slug: "slug-convention-2",
      title: "titre convention 2"
    });
  });

  it("when searching by text, should use ES, api SIREN and siret2idcc", async () => {
    fetch.mockImplementation(url => {
      return Promise.resolve({
        ok: true,
        json: () => {
          if (url === "api.url/idcc?q=hello") {
            return Promise.resolve({
              hits: {
                hits: [
                  {
                    _source: {
                      idcc: "275",
                      id: "KALICONT000000000001",
                      title: "titre convention 1",
                      slug: "slug-convention-1"
                    }
                  }
                ]
              }
            });
          } else if (
            url ===
            "https://entreprise.data.gouv.fr/api/sirene/v1/full_text/hello?per_page=50"
          ) {
            return Promise.resolve({
              etablissement: [
                {
                  id: 199308119,
                  siret: "44144914700020",
                  nom_raison_sociale: "Entreprise 1",
                  code_postal: 93100,
                  libelle_commune: "Commune test"
                }
              ]
            });
          } else if (
            url ===
            "https://siret2idcc.incubateur.social.gouv.fr/api/v2/44144914700020"
          ) {
            return Promise.resolve([
              {
                siret: "44144914700020",
                conventions: [
                  {
                    active: true,
                    date_publi: "1976-04-01T00:00:00.000Z",
                    etat: "VIGUEUR_ETEN",
                    id: "KALICONT000005635886",
                    nature: "IDCC",
                    num: "843",
                    title: "Convention 1"
                  }
                ]
              }
            ]);
          }
        }
      });
    });
    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention
    });
    fireEvent.change(getByRole("search"), { target: { value: "hello" } });
    jest.runOnlyPendingTimers(); // run debounce timer
    await wait(); // with for promise to resolve
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(container).toMatchSnapshot();
  });

  it("should not use siret2idcc when no entreprise result", async () => {
    fetch.mockImplementation(url => {
      return Promise.resolve({
        ok: true,
        json: () => {
          if (url === "api.url/idcc?q=xxxx") {
            return Promise.resolve({
              hits: {
                hits: [
                  {
                    _source: {
                      idcc: "275",
                      id: "KALICONT000000000001",
                      title: "titre convention 1",
                      slug: "slug-convention-1"
                    }
                  }
                ]
              }
            });
          } else if (
            url ===
            "https://entreprise.data.gouv.fr/api/sirene/v1/full_text/xxxx?per_page=50"
          ) {
            return Promise.resolve({
              message: "no results found"
            });
          }
        }
      });
    });

    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention
    });
    fireEvent.change(getByRole("search"), { target: { value: "xxxx" } });
    jest.runOnlyPendingTimers(); // run debounce timer
    await wait(); // with for promise to resolve
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(container).toMatchSnapshot();
  });

  it("when searching SIRET, should use API SIREN and siret2idcc", async () => {
    fetch.mockImplementation(url => {
      return Promise.resolve({
        ok: true,
        json: () => {
          if (
            url ===
            "https://entreprise.data.gouv.fr/api/sirene/v1/siret/01234567891011"
          ) {
            return Promise.resolve({
              etablissement: {
                id: 199308119,
                siret: "01234567891011",
                nom_raison_sociale: "Entreprise 1",
                code_postal: 93100,
                libelle_commune: "Commune test"
              }
            });
          } else if (
            url ===
            "https://siret2idcc.incubateur.social.gouv.fr/api/v2/01234567891011"
          ) {
            return Promise.resolve([
              {
                siret: "01234567891011",
                conventions: [
                  {
                    active: true,
                    date_publi: "1976-04-01T00:00:00.000Z",
                    etat: "VIGUEUR_ETEN",
                    id: "KALICONT000005635886",
                    nature: "IDCC",
                    num: "843",
                    title: "Convention 1"
                  }
                ]
              }
            ]);
          }
        }
      });
    });
    const onSelectConvention = jest.fn();
    const { container, getByRole } = renderSearchForm({
      onSelectConvention
    });
    fireEvent.change(getByRole("search"), {
      target: { value: "01234567891011" }
    });
    jest.runOnlyPendingTimers(); // run debounce timer
    await wait(); // with for promise to resolve
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(container).toMatchSnapshot();
  });
});
