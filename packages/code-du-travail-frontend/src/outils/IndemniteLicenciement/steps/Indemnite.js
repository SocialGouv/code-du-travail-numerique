import { icons, IconStripe } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import {
  Warning,
  WarningTitle,
} from "../../DureePreavisRetraite/steps/component/WarningResult";
import { IndemniteLegale } from "../components/IndemniteLegale";
import { getIndemniteFromFinalForm } from "../indemnite";

function StepIndemnite({ form }) {
  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  return (
    <>
      <IndemniteLegale
        indemnite={indemniteLegale}
        infoCalcul={infoCalculLegal}
      />
      <Warning>
        <IconStripe centered icon={icons.Warning}>
          <WarningTitle>
            Attention il peut exister un montant plus favorable
          </WarningTitle>
        </IconStripe>
        <p>
          Une convention collective, un accord d’entreprise, le contrat de
          travail ou un usage peuvent prévoir un montant plus favorable pour le
          salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique
          au salarié.
        </p>
      </Warning>

      <p>
        Pour en savoir plus sur l’indemnité de licenciement et son mode de
        calcul, consultez{" "}
        <Link
          href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
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
