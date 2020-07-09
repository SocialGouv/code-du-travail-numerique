const { SOURCES } = require("@socialgouv/cdtn-sources");

function getAgreementBody({ slug }) {
  return {
    query: {
      bool: {
        filter: [{ term: { slug } }, { term: { source: SOURCES.CCN_PAGE } }],
      },
    },
    size: 1,
  };
}
module.exports = getAgreementBody;
