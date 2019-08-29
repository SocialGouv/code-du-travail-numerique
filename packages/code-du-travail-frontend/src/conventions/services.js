import getConfig from "next/config";
import memoizee from "memoizee";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function getConventionTextes(conventionId, typeTextes) {
  return fetch(`${API_URL}/conventions/${conventionId}/${typeTextes}`).then(
    response => {
      if (response.ok) {
        return response.json().then(data => data._source);
      }
      throw new Error("Un problème est survenu.");
    }
  );
}

const getConventionTextesMemo = memoizee(
  (conventionId, typeTextes) => getConventionTextes(conventionId, typeTextes),
  {
    promise: true
  }
);

export {
  getConventionTextesMemo as getConventionTextes,
  getConventionTextes as _getConventionTextes
};
