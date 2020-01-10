import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Toast } from "@socialgouv/react-ui";

import { getIndemniteFromFinalForm } from "../indemnite";
import { IndemniteLegale } from "../components/IndemniteLegale";
import { Feedback } from "../../../common/Feedback";

function StepIndemnite({ form }) {
  const router = useRouter();
  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  return (
    <>
      <IndemniteLegale
        indemnite={indemniteLegale}
        infoCalcul={infoCalculLegal}
      />
      <Toast>
        Un accord d’entreprise, le contrat de travail ou un usage peuvent
        prévoir un montant plus favorable pour le salarié. Dans ce cas, le
        montant dû est le montant le plus favorable pour le salarié.
      </Toast>
      <Feedback url={router.asPath} />
    </>
  );
}
StepIndemnite.propTypes = {
  form: PropTypes.object.isRequired
};
export { StepIndemnite };
