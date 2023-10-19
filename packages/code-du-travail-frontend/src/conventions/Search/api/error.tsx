import React from "react";

import { Error } from "../../../outils/common/ErrorField";

export const nafError = (
  <Error>
    Numéro d’indentification (IDCC) incorrect. Il semblerait que vous ayez saisi
    un code <abbr title="Activité Principale Exercée">APE</abbr> (Activité
    Principale Exercée) ou{" "}
    <abbr title="Nomenclature des Activités Françaises">NAF</abbr> (Nomenclature
    des Activités Françaises) et dont l’objectif est d’identifier l’activité
    principale de l’entreprise.
  </Error>
);
