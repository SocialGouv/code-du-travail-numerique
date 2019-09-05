export function fetchResponse(data = {}) {
  return {
    ok: true,
    json: () => Promise.resolve(data)
  };
}
