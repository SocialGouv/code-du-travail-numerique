import { format, parse } from "date-fns";
import PropTypes from "prop-types";
import Engine from "publicodes";
import React from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import rules from "../modele/index";

function StepResult({ form }) {
  const { values } = form.getState();

  var flattenObject = function (ob) {
    var toReturn = {};

    for (var i in ob) {
      // eslint-disable-next-line no-prototype-builtins
      if (!ob.hasOwnProperty(i)) continue;

      if (typeof ob[i] == "object") {
        var flatObject = flattenObject(ob[i]);
        for (var x in flatObject) {
          // eslint-disable-next-line no-prototype-builtins
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + "." + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  };

  const engine = new Engine(rules);
  const valuesCopy = JSON.parse(JSON.stringify(values));
  delete valuesCopy["ccn"];
  const situation = flattenObject(valuesCopy);
  const situation2 = {
    ...situation,
    "contrat salarié . date embauche": format(
      parse(
        situation["contrat salarié . date embauche"],
        "yyyy-MM-dd",
        new Date()
      ),
      "dd/MM/yyyy"
    ),
    "contrat salarié . date rupture": format(
      parse(
        situation["contrat salarié . date rupture"],
        "yyyy-MM-dd",
        new Date()
      ),
      "dd/MM/yyyy"
    ),
    "contrat salarié . convention collective": `'IDCC${values.ccn.num}'`,
  };

  engine.setSituation(situation2);
  const result = engine.evaluate("contrat salarié . ancienneté");

  return (
    <>
      <SectionTitle>Résultat</SectionTitle>
      <>
        <p>
          À partir des éléments que vous avez saisis, votre ancienneté est
          estimée à&nbsp;
          <Highlight>
            {Math.round(result.nodeValue)} {result.unit.numerators}
          </Highlight>
          .
        </p>
      </>
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired,
  }),
};

export { StepResult };
