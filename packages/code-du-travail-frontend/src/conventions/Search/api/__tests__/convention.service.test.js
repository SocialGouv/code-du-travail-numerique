import fetch from "isomorphic-unfetch";

import { fetchResponse } from "../../../../../test/mockFetch";
import { searchConvention } from "../convention.service";
import { idccPayload } from "./conventions.mock";

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
});
