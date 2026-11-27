// Source of the "site settings" document published by cdtn-admin (settings
// page). Not part of SOURCES: it is a technical document, never rendered.
export const SETTINGS_SOURCE = "settings";

export function getSettingsBody() {
  return {
    _source: ["npsEnabled"],
    size: 1,
    query: {
      bool: {
        filter: {
          term: { source: SETTINGS_SOURCE },
        },
      },
    },
  };
}
