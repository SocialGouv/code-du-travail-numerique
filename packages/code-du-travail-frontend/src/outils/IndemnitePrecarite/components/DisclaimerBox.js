import React from "react";

import Disclaimer from "../../common/Disclaimer";

function DisclaimerBox({ situation, idcc }) {
  if (idcc > 0 && situation.idcc > 0) {
    return (
      <Disclaimer title={"Attention il peut exister un montant plus favorable"}>
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
      </Disclaimer>
    );
  }
  // case for no ccn provided or unhandled ccn
  return (
    <Disclaimer title={"Attention il peut exister un montant plus favorable"}>
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
    </Disclaimer>
  );
}

export default DisclaimerBox;
