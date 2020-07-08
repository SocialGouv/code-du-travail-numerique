const { SOURCES } = require("@cdt/sources");

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
