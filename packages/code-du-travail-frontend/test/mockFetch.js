export function mockFetch(data) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => data
  });
}
