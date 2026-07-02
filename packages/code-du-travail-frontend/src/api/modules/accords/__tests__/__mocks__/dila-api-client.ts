// Test stub for @socialgouv/dila-api-client.
//
// The real client bundles @hapi/wreck and performs real HTTP requests. Relying on
// jest.mock() to replace it was flaky under the full parallel suite: the mock
// intermittently failed to intercept the service's import, letting DilaApiClient.fetch
// hit the network ("content-type is not JSON compatible", "401 Unauthorized").
//
// jest.config.js redirects "@socialgouv/dila-api-client" to this file via
// moduleNameMapper — a resolver-level redirect that does not depend on jest.mock
// hoisting, so the real module is never loaded and a network call is impossible.
//
// Tests import `mockDilaFetch` from here to drive the mocked responses.
export const mockDilaFetch = jest.fn();

export class DilaApiClient {
  fetch = mockDilaFetch;
}
