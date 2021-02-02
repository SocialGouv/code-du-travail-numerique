module.exports = {
  aggs: {
    sources: {
      terms: {
        exclude: ["fiches_ministere_travail", "versions"],
        field: "source",
        order: {
          _key: "asc",
        },
        size: 17,
      },
    },
  },
  size: 0,
};
