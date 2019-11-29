function getAgreementBody({ slug }) {
  return {
    size: 1,
    query: {
      term: { slug }
    }
  };
}
module.exports = getAgreementBody;
