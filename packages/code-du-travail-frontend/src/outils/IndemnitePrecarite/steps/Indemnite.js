import data from "@cdt/data...prime-precarite/precarite.data.json";
import { Accordion } from "@socialgouv/cdtn-ui";
import React from "react";

import { A11yLink } from "../../../common/A11yLink";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { MathFormula } from "../../common/MathFormula";
import {
  filterSituations,
  getRef,
  getSituationsFor,
} from "../../common/situations.utils";
import { HighlightResult, SectionTitle } from "../../common/stepStyles";
import DisclaimerBox from "../components/DisclaimerBox";
import { CONTRACT_TYPE } from "../components/TypeContrat";
import { getIndemnitePrecarite } from "../indemnite";

function extractRefs(refs = []) {
  //some ref are duplicated so we need to dedup them

  const tempRefs = refs
    .filter((item) => item.refLabel && item.refUrl)
    .flatMap(({ refUrl, refLabel }) => {
      const urls = refUrl.split(/\n/);
      const labels = refLabel.split(/\n/);
      return urls.map((url, i) => ({ refLabel: labels[i], refUrl: url }));
    });

  const refMap = {};
  for (const { refUrl, refLabel } of tempRefs) {
    refMap[refUrl] = refLabel;
  }
  return Object.entries(refMap).map(([refUrl, ref]) => ({
    ref,
    refUrl,
  }));
}

function getConventionCollectiveText(ccn, situations) {
  return ccn
    ? situations.length > 0
      ? ccn.title
      : "La convention collective n'a pas été traitée par nos services."
    : "La convention collective n'a pas été renseignée.";
}

function StepIndemnite({ form }) {
  const state = form.getState();
  const {
    contractType,
    typeRemuneration,
    salaires,
    salaire,
    ccn,
    criteria = {},
  } = state.values;

  const idcc = ccn ? ccn.num : 0;
  const [situationCdt] = getSituationsFor(data, { contractType, idcc: 0 });
  const initialSituations = getSituationsFor(data, { contractType, idcc });
  const situations = filterSituations(initialSituations, criteria);
  let rate = "10%";
  let bonusAltName = "La prime de précarité";
  let legalRefs;
  let situation;
  switch (situations.length) {
    case 1: {
      [situation] = situations;
      if (situation.hasConventionalProvision) {
        rate = situation.rate;
      }
      bonusAltName = situation.bonusLabel || bonusAltName;

      legalRefs = extractRefs(
        idcc !== 0 ? [situation, situationCdt] : [situationCdt]
      );

      break;
    }
    default: {
      situation = situationCdt;
      legalRefs = extractRefs([situationCdt]);
    }
  }
  const [, value] = rate.match(/(\d+)%/);
  const rateValue = parseInt(value) / 100;
  const rateLabel = `${value}/100`;

  const { indemnite, formula, inputs } = getIndemnitePrecarite({
    rateLabel,
    rateValue,
    salaire,
    salaires,
    typeRemuneration,
  });

  const entries = Object.entries({
    "Convention collective": getConventionCollectiveText(ccn, situations),
    ...inputs,
  });

  return (
    <>
      <SectionTitle>Montant</SectionTitle>
      <p>
        {bonusAltName} est estimée à&nbsp;:&nbsp;
        <HighlightResult>{indemnite}&nbsp;€</HighlightResult>.
      </p>

      <Accordion
        items={[
          {
            body: (
              <>
                <SectionTitle>Éléments saisis</SectionTitle>
                {entries.length > 0 && (
                  <ul>
                    {entries.map(([label, value], index) => (
                      <li key={index}>
                        {label}&nbsp;: <strong>{value}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <SectionTitle>Formule</SectionTitle>
                <ErrorBoundary>
                  <MathFormula formula={formula} />
                </ErrorBoundary>
                <SectionTitle>Source</SectionTitle>
                {getRef(legalRefs)}
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <DisclaimerBox situation={situation} idcc={idcc} />

      <p>
        En savoir plus sur la prime de précarité d’un{" "}
        {contractType === CONTRACT_TYPE.CDD ? (
          <A11yLink
            target="_blank"
            rel="noopener noreferrer"
            href="/fiche-service-public/fin-dun-contrat-a-duree-determinee-cdd"
          >
            salarié en CDD
          </A11yLink>
        ) : (
          <A11yLink
            target="_blank"
            rel="noopener noreferrer"
            href="/fiche-service-public/contrat-de-travail-temporaire-interim"
          >
            salarié en contrat de travail temporaire (contrat d’intérim)
          </A11yLink>
        )}
      </p>
    </>
  );
}

export { StepIndemnite };
