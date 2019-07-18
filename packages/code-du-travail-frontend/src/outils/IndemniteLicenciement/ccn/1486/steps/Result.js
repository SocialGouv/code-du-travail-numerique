import React from "react";
import styled from "styled-components";
import { Toast, theme } from "@cdt/ui";

import { getIndemniteConventionnelle } from "../indemnite";
import { getIndemniteFromFinalForm } from "../../../indemnite";
import { round } from "../../../../common/math";
import { Highlight } from "../../../../common/stepStyles";
import { IndemniteCCn } from "../../../components/IndemniteConventionnelle";

function Result({ form }) {
  const data = form.getState().values;

  const {
    indemniteLegale,
    salaireRefLegal,
    infoCalculLegal
  } = getIndemniteFromFinalForm(form);

  const {
    indemniteConventionnelle,
    infoCalculConventionnel,
    error
  } = getIndemniteConventionnelle(data, salaireRefLegal);

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
      Attention, ce tier ({round(indemniteConventionnelle / 3)}&nbsp;€) vous est
      dû si la période d’essai dans ce nouvel emploi reste sans suite.
    </StyledToast>
  );

  return (
    <IndemniteCCn
      indemniteConventionnelle={indemniteConventionnelle}
      indemniteLegale={indemniteLegale}
      AdditionnalContent={IndemniteWarning}
      infoCalculLegal={infoCalculLegal}
      infoCalculConventionnel={infoCalculConventionnel}
      branche={data.branche}
      error={error}
    />
  );
}

export { Result };

const { spacing } = theme;

const StyledToast = styled(Toast)`
  margin: ${spacing.interComponent} 0;
`;
