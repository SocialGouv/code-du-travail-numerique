module.exports = {
  size: 0,
  aggs: {
    sources: {
      terms: { field: "source" },
    },
  },
};
