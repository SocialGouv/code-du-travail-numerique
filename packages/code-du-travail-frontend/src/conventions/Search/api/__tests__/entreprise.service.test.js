import { fetchResponse } from "../../../../../test/mockFetch";
import {
  searchEntrepriseByName,
  searchEntrepriseBySiren,
  searchEntrepriseBySiret,
} from "../entreprise.service";
import {
  fulltextPayload,
  sirenPayload,
  siretIdccPayload,
  siretPayload,
} from "./entretrise.mock";
import { API_SIRET2IDCC_URL, API_ENTREPRISE_URL } from "../../../../config";

global.fetch = jest.fn();

fetch.mockImplementation((url) => {
  if (url.startsWith(`${API_ENTREPRISE_URL}/v1/full_text`)) {
    return Promise.resolve(fetchResponse(fulltextPayload));
  } else if (url.startsWith(`${API_ENTREPRISE_URL}/v3/etablissements`)) {
    return Promise.resolve(fetchResponse(siretPayload));
  } else if (url.startsWith(`${API_ENTREPRISE_URL}/v3/unites_legales`)) {
    return Promise.resolve(fetchResponse(sirenPayload));
  } else if (url.startsWith(`${API_SIRET2IDCC_URL}`)) {
    return Promise.resolve(fetchResponse(siretIdccPayload));
  } else {
    return Promise.resolve(fetchResponse());
  }
});

beforeEach(() => fetch.mockClear());

describe("api entreprise", () => {
  it("can get entreprise data by name", async () => {
    const query = "Corso balard";
    const results = await searchEntrepriseByName(query);
    const apiEntrepriseMatcher = new RegExp(
      `${API_ENTREPRISE_URL}/v1/full_text/corso%20balard`
    );
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[0][0]).toMatch(apiEntrepriseMatcher);
    expect(fetch.mock.calls[1][0]).toMatch(
      new RegExp(`${API_SIRET2IDCC_URL}/80258570300035,80258570300027`)
    );
    expect(results).toMatchSnapshot();
  });
  it("strip accents", async () => {
    const query = "véolia";
    const results = await searchEntrepriseByName(query);
    const apiEntrepriseMatcher = new RegExp(
      `${API_ENTREPRISE_URL}/v1/full_text/veolia`
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(apiEntrepriseMatcher);
    expect(results).toMatchSnapshot();
  });
  it("can get entreprise data by siret and reuse memoized call from previous siret2idcc", async () => {
    const query = "80258570300035";
    const results = await searchEntrepriseBySiret(query);
    const apiMatcher = new RegExp(
      `${API_ENTREPRISE_URL}/v3/etablissements/${encodeURIComponent(query)}`
    );

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(fetch.mock.calls[1][0]).toMatch(
      new RegExp(`${API_SIRET2IDCC_URL}/80258570300035`)
    );
    expect(results).toMatchSnapshot();

    const results2 = await searchEntrepriseBySiret(query);
    expect(fetch).toHaveBeenCalledTimes(2); // 2 not 4 because memoized
    expect(results2).toMatchSnapshot();
  });
  it("can get entreprise data by siren and reuse memoized call from previous siret2idcc", async () => {
    const query = "802585703";
    const results = await searchEntrepriseBySiren(query);
    const apiMatcher = new RegExp(
      `${API_ENTREPRISE_URL}/v3/unites_legales/${encodeURIComponent(query)}`
    );

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[0][0]).toMatch(apiMatcher);
    expect(fetch.mock.calls[1][0]).toMatch(
      new RegExp(
        `${API_SIRET2IDCC_URL}/80258570300027,80258570300035,80258570300019`
      )
    );
    expect(results).toMatchSnapshot();

    const results2 = await searchEntrepriseBySiren(query);
    expect(fetch).toHaveBeenCalledTimes(2); // 2 not 4 because memoized
    expect(results2).toMatchSnapshot();
  });
});
