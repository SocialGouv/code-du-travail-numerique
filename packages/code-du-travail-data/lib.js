function parseIdcc(idcc) {
  return parseInt(idcc, 10);
}
function formatIdcc(num) {
  return `0000${num}`.slice(-4);
}

module.exports = {
  parseIdcc,
  formatIdcc
};
