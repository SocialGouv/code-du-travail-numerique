import React from "react";
import styled from "styled-components";
import { Toast, theme } from "@cdt/ui-old";

import { getIndemniteConventionnelle } from "../indemnite";
import { getIndemniteFromFinalForm } from "../../../indemnite";
import { round } from "../../../../common/math";
import { Highlight } from "../../../../common/stepStyles";
import { IndemniteCCn } from "../../../components/IndemniteConventionnelle";

function Result({ form }) {
  const data = form.getState().values;

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);

  const {
    indemniteConventionnelle,
    infoCalculConventionnel,
    error
  } = getIndemniteConventionnelle(data);

  const IndemniteWarning = () => (
    <StyledToast variant="warning">
      Si un emploi équivalent a été trouvé
      <ul>
        <li>par votre employeur</li>
        <li>dans une autre entreprise</li>
        <li>avant la fin du préavis</li>
        <li>et que vous l’acceptez</li>
      </ul>
      Alors l’indemnité de licenciement conventionnelle est réduite d’un tiers
      et passe donc à{" "}
      <Highlight>{round((indemniteConventionnelle * 2) / 3)}&nbsp;€</Highlight>
      <br />
      Attention, ce tiers ({round(indemniteConventionnelle / 3)}&nbsp;€) vous
      est dû si la période d’essai dans ce nouvel emploi reste sans suite.
    </StyledToast>
  );

  return (
    <IndemniteCCn
      indemniteConventionnelle={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      infoCalculLegal={infoCalculLegal}
      infoCalculConventionnel={infoCalculConventionnel}
      branche={data.branche}
      error={error}
    >
      {indemniteConventionnelle > indemniteLegale ? <IndemniteWarning /> : null}
    </IndemniteCCn>
  );
}

export { Result };

const { spacing } = theme;

const StyledToast = styled(Toast)`
  margin: ${spacing.interComponent} 0;
`;
