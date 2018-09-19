const prod = process.env.NODE_ENV === "production";

const env = {
  "process.env.NODE_ENV": process.env.NODE_ENV,
  "process.env.API_URL":
    process.env.API_URL ||
    (prod
      ? "https://cdtn-api.num.social.gouv.fr/api/v1"
      : "http://localhost:1337/api/v1")
};

console.log(`

  Environment:

    - process.env.NODE_ENV : ${process.env.NODE_ENV}
    - process.env.API_URL : ${process.env.API_URL}

`);

module.exports = env;
