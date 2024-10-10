import { SOURCES } from "@socialgouv/cdtn-utils";

export function getGlossaryBody() {
  return {
    _source: ["data"],
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.GLOSSARY },
        },
      },
    },
  };
}
