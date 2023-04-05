import { fetchResponse } from "../../../../../test/mockFetch";
import { searchAgreement } from "../agreement.service";
import { idccPayload } from "./agreement.mock";

global.fetch = jest.fn();

describe("agreement service", () => {
  beforeEach(() => fetch.mockClear());
  it("can search IDCCs", async () => {
    fetch.mockResolvedValue(fetchResponse(idccPayload));
    const results = await searchAgreement("foo");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/api\/idcc\?q=foo$/);
    expect(results).toMatchSnapshot();
  });
});
