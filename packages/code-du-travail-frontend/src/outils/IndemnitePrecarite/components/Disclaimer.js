import { icons, IconStripe } from "@socialgouv/cdtn-ui";
import React from "react";

import {
  Warning,
  WarningTitle,
} from "../../DureePreavisRetraite/steps/component/WarningResult";

function Disclaimer({ situation, idcc }) {
  if (idcc > 0 && situation.idcc > 0) {
    return (
      <Warning>
        <IconStripe centered icon={icons.Warning}>
          <WarningTitle>
            Attention il peut exister un montant plus favorable
          </WarningTitle>
        </IconStripe>
        <p>
          Un accord d’entreprise peut prévoir un montant différent qu’il soit
          plus élevé ou plus faible. Dans ce cas, s’applique le montant prévu
          par l’accord d’entreprise, sauf si le contrat de travail prévoit un
          montant plus favorable pour le salarié.
        </p>
        {!situation.hasConventionalProvision && (
          <p>
            Attention, dans le cas où l’accord d’entreprise prévoit un taux
            inférieur à 10% dans la limite de 6%, il doit y avoir des
            contreparties offertes au salarié, notamment sous la forme d’un
            accès privilégié à la formation professionnelle (action de
            formation, bilan de compétences).
          </p>
        )}
      </Warning>
    );
  }
  // case for no ccn provided or unhandled ccn
  return (
    <Warning>
      <IconStripe centered icon={icons.Warning}>
        <WarningTitle>
          Attention il peut exister un montant plus favorable
        </WarningTitle>
      </IconStripe>
      <p>
        Une convention collective de branche étendue ou un accord d’entreprise
        peut prévoir un montant différent qu’il soit plus élevé ou plus faible
        que celui prévu par le code du travail.
      </p>
      <p>
        Attention, dans le cas où la convention ou l’accord collectif prévoit un
        taux inférieur à 10% dans la limite de 6%, il doit y avoir des
        contreparties offertes au salarié, notamment sous la forme d’un accès
        privilégié à la formation professionnelle (action de formation, bilan de
        compétences). Dans tous les cas, le contrat de travail peut prévoir un
        montant plus favorable pour le salarié. Il faut alors appliquer ce
        montant.
      </p>
    </Warning>
  );
}

export default Disclaimer;
