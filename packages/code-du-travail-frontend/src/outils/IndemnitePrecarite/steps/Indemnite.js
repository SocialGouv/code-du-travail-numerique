import React from "react";
import Link from "next/link";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";
import MathJax from "react-mathjax-preview";
import data from "@cdt/data...prime-precarite/precarite.data.json";

import { getIndemnitePrecarite } from "../indemnite";
import { Summary, Highlight } from "../../common/stepStyles";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import {
  filterSituations,
  getSituationsFor
} from "../../common/situations.utils";
import { CONTRACT_TYPE } from "../components/TypeContrat";

function StepIndemnite({ form }) {
  const state = form.getState();
  const {
    contractType,
    typeRemuneration,
    salaires,
    salaire,
    ccn,
    criteria = {}
  } = state.values;

  const idcc = ccn ? ccn.num : "0000";
  const initialSituations = getSituationsFor(data, { idcc, contractType });
  const situations = filterSituations(initialSituations, criteria);

  let rate = "10%";
  let bonusAltName = "La prime de précarité";
  let references;

  switch (situations.length) {
    case 1: {
      const [situation] = situations;
      rate = situation.rate;
      bonusAltName = situation.bonusLabel || bonusAltName;
      references = getRef(situation);
      break;
    }
    default: {
      const situations = getSituationsFor(data, { idcc: "0000", contractType });
      const [situation] = situations;
      references = getRef(situation);
    }
  }

  const [, value] = rate.match(/(\d+)%/);
  const rateValue = parseInt(value) / 100;
  const rateLabel = `${value}/100`;

  const { indemnite, formule, inputs } = getIndemnitePrecarite({
    typeRemuneration,
    salaire,
    salaires,
    rateValue,
    rateLabel
  });

  const entries = Object.entries(inputs);

  return (
    <>
      <p>
        {bonusAltName} est estimée à <Highlight>{indemnite}</Highlight> €.
      </p>
      <details>
        <Summary>Detail du calcul</Summary>
        <div>
          <Heading>Élements saisis :</Heading>
          {entries.length > 0 && (
            <List>
              {entries.map(([label, value], index) => (
                <Item key={index}>
                  {label}&nbsp;: {value}
                </Item>
              ))}
            </List>
          )}
          <Heading>Calcul :</Heading>
          <ErrorBoundary>
            <FormuleWrapper>
              <MathJax math={"`" + formule + "`"} />
            </FormuleWrapper>
          </ErrorBoundary>
        </div>
      </details>
      {references}
      <p>
        En savoir plus sur la prime de précarité d’un{" "}
        {contractType === CONTRACT_TYPE.CDD ? (
          <Link
            href="/fiche-service-public/[slug]"
            as={"/fiche-service-public/fin-dun-contrat-a-duree-determinee-cdd"}
          >
            <a>salarié en CDD</a>
          </Link>
        ) : (
          <Link
            href="/fiche-service-public/[slug]"
            as={"/fiche-service-public/contrat-de-travail-temporaire-interim"}
          >
            <a>salarié en contrat de travail temporaire (contrat d’intérim)</a>
          </Link>
        )}
      </p>
    </>
  );
}

export { StepIndemnite };

function getRef({ refLabel, refUrl }) {
  if (!refLabel || !refUrl) {
    return null;
  }
  const urls = refUrl.split(/\n/);
  const labels = refLabel.split(/\n/);
  const refs = urls.map((url, i) => [url, labels[i]]);
  return (
    <p>
      {refs
        .map(([url, label]) => (
          <a key={url} href={url} title={`Consultez l’${label.toLowerCase()}`}>
            {label}
          </a>
        ))
        .reduce((state, item) => (
          <>
            {state}, {item}
          </>
        ))}
    </p>
  );
}

const { spacings, fonts } = theme;

const Heading = styled.strong`
  font-weight: bold;
  font-size: ${fonts.sizes.small};
`;

const dashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 6 10"><path fill="currentColor" d="M0 4h5v1H0z"/></svg>`;
const List = styled.ul`
  list-style-image: url("data:image/svg+xml;,${encodeURIComponent(dashSvg)}");
`;
const Item = styled.li`
  font-size: ${fonts.sizes.small};
`;
const FormuleWrapper = styled.div`
  margin: ${spacings.base} 0;
`;
