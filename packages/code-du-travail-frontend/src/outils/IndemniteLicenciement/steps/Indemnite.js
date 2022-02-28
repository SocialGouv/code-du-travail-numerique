import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";

import Disclaimer from "../../common/Disclaimer";
import { IndemniteLegale } from "../components/IndemniteLegale";

function StepIndemnite({ form }) {
  return (
    <>
      <IndemniteLegale formValues={form.getState().values} />
      <Disclaimer title={"Attention il peut exister un montant plus favorable"}>
        <p>
          Une convention collective, un accord d’entreprise, le contrat de
          travail ou un usage peuvent prévoir un montant plus favorable pour le
          salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique
          au salarié.
        </p>
      </Disclaimer>
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
