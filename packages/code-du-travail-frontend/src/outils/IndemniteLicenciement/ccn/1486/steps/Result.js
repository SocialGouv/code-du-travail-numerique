import { theme, Toast } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { Highlight } from "../../../../common/stepStyles";
import { round } from "../../../../common/utils";
import { IndemniteCCn } from "../../../components/IndemniteConventionnelle";
import { getIndemniteFromFinalForm } from "../../../indemnite";
import { getIndemniteConventionnelle } from "../indemnite";

function Result({ form }) {
  const data = form.getState().values;

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);

  const { indemniteConventionnelle, infoCalculConventionnel, error } =
    getIndemniteConventionnelle(data);

  const IndemniteWarning = () => (
    <StyledToast>
      Si un emploi équivalent a été trouvé
      <ul>
        <li>par l’employeur</li>
        <li>dans une autre entreprise</li>
        <li>avant la fin du préavis</li>
        <li>et que le salarié l’accepte</li>
      </ul>
      Alors l’indemnité de licenciement conventionnelle est réduite d’un tiers
      et passe donc à{" "}
      <Highlight>{round((indemniteConventionnelle * 2) / 3)}&nbsp;€</Highlight>
      <br />
      Attention, ce tiers ({round(indemniteConventionnelle / 3)}&nbsp;€) est dû
      si la période d’essai dans ce nouvel emploi reste sans suite.
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

const { spacings } = theme;

const StyledToast = styled(Toast)`
  margin: ${spacings.medium} 0;
`;
