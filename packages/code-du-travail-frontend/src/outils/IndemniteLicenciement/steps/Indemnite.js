import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@socialgouv/react-ui";

import { getIndemniteFromFinalForm } from "../indemnite";
import { IndemniteLegale } from "../components/IndemniteLegale";

function StepIndemnite({ form }) {
  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  return (
    <>
      <IndemniteLegale
        indemnite={indemniteLegale}
        infoCalcul={infoCalculLegal}
      />
      <Toast>
        Une convention collective, un accord d’entreprise, le contrat de travail
        ou un usage peuvent prévoir un montant plus favorable pour le salarié.
      </Toast>
    </>
  );
}
StepIndemnite.propTypes = {
  form: PropTypes.object.isRequired
};
export { StepIndemnite };
