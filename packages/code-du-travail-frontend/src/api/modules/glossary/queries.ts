import { SOURCES } from "@socialgouv/cdtn-utils";

export function getGlossaryBody() {
  return {
    query: {
      bool: {
        filter: {
          term: { source: SOURCES.GLOSSARY },
        },
      },
    },
  };
}
