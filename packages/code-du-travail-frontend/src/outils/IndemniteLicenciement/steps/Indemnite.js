import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
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
      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez{" "}
        <Link
          href="/fiche-service-public/[slug]"
          as={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
        >
          <a>cet article</a>
        </Link>
        .
      </p>
    </>
  );
}
StepIndemnite.propTypes = {
  form: PropTypes.object.isRequired,
};
export { StepIndemnite };
