const { SOURCES } = require("@socialgouv/cdtn-sources");

function getAgreementBody({ slug }) {
  return {
    size: 1,
    query: {
      bool: {
        filter: [{ term: { slug } }, { term: { source: SOURCES.CCN_PAGE } }],
      },
    },
  };
}
module.exports = getAgreementBody;
