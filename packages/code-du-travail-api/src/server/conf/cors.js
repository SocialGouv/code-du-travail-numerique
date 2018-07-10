// https://github.com/koajs/cors
// https://github.com/koajs/cors/issues/12

const validOrigins = [
  'http://localhost:3000', // URL + port of the frontend (in dev mode).
  'https://code-du-travail.beta.gouv.fr',
]

function originIsValid (origin) {
  return validOrigins.indexOf(origin) !== -1
}

function verifyOrigin (ctx) {
  const origin = ctx.headers.origin
  if (!originIsValid(origin)) {
    return false
  }
  return origin
}

const config = {
  origin: verifyOrigin,
}

module.exports = {
  config,
}
