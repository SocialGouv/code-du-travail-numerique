import { searchConvention, getConventionTextes } from "../convention.service";
import { idccPayload, texteDeBase } from "./api.conventions.mock";

import fetch from "isomorphic-unfetch";
import { fetchResponse } from "../../../test/mockFetch";

jest.mock("isomorphic-unfetch");

describe("convention service", () => {
  beforeEach(() => fetch.mockClear());
  it("can search IDCCs", async () => {
    fetch.mockResolvedValue(fetchResponse(idccPayload));
    const results = await searchConvention("foo");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/idcc\?q=foo$/);
    expect(results).toMatchSnapshot();
  });
  it("can get convention", async () => {
    fetch.mockResolvedValue(fetchResponse(texteDeBase));
    const results = await getConventionTextes("foo", "base");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/conventions\/foo\/base$/);
    expect(results).toMatchSnapshot();
  });
});
