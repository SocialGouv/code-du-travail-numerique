import Link from "next/link";
import React from "react";

import Disclaimer from "../../common/Disclaimer";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";

type Props = {
  result: number | string;
  unit: string;
  children?: React.ReactNode;
};

export function IndemniteLegale({ result, unit }: Props): JSX.Element {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        {"Le code du travail prévoit un montant minimum de : "}
        <HighlightResult>{`${result} ${unit} brut.`}</HighlightResult>
      </p>
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
