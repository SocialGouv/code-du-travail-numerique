export function fetchResponse(data = {}) {
  return {
    json: () => Promise.resolve(data),
    ok: true,
  };
}
