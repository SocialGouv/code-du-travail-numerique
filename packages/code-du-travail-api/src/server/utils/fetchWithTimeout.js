const fetch = require("node-fetch");

function fetchWithTimeout(url, options = {}, timeout = 500) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error(`fetch timeout for ${url}`));
      }, timeout),
    ),
  ]);
}

module.exports = fetchWithTimeout;
