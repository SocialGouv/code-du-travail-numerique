"use strict"; // https://github.com/koajs/cors
// https://github.com/koajs/cors/issues/12
const validOrigins = [
  "https://codedutravail.num.social.gouv.fr",
  "https://codedutravail-dev.num.social.gouv.fr",
  "https://code-du-travail.beta.gouv.fr",
  "https://socialgouv.github.io",
];
if (process.env.NODE_ENV !== "production") {
  validOrigins.push(
    "http://127.0.0.1:3000" // URL + port of the frontend (in dev mode).
  );
}
function originIsValid(origin) {
  return validOrigins.indexOf(origin) !== -1;
}
function verifyOrigin(ctx) {
  const origin = ctx.headers.origin;
  if (!originIsValid(origin)) {
    return false;
  }
  return origin;
}
const config = { origin: verifyOrigin };
module.exports = { config };
