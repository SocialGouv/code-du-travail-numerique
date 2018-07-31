const dev = process.env.NODE_ENV !== 'production'

const BASE_URL = dev ? 'http://localhost:1337/api/v1' : 'https://cdtn-api.num.social.gouv.fr/api/v1'

const ERROR_MSG = "Un problème est survenu."

module.exports = {
  BASE_URL,
  ERROR_MSG,
}
