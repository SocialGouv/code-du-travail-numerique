import React from "react";
import Link from "next/link";
import { theme, Alert } from "@socialgouv/react-ui";
import styled from "styled-components";
import MathJax from "react-mathjax-preview";
import data from "@cdt/data...prime-precarite/precarite.data.json";
import { getIndemnitePrecarite } from "../indemnite";
import { SectionTitle, Highlight } from "../../common/stepStyles";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import {
  filterSituations,
  getSituationsFor,
  getRef
} from "../../common/situations.utils";
import { CONTRACT_TYPE } from "../components/TypeContrat";

function Disclaimer({ situation }) {
  if (situation.idcc > 0) {
    if (situation.hasConventionalProvision) {
      return (
        <Alert>
          Une convention collective de branche étendue ou un accord d’entreprise
          peut prévoit un montant différent qu’il soit plus élevé ou plus faible
          que celui prévu par le code du travail. Attention, dans le cas où la
          convention ou l’accord collectif prévoit un taux inférieur à 10% dans
          la limite de 6 %, il doit y avoir des contreparties offertes au
          salarié, notamment sous la forme d’un accès privilégié à la formation
          professionnelle (action de formation, bilan de compétences). Dans tous
          les cas, le contrat de travail peut prévoir un montant plus favorable
          pour le salarié. Il faut alors appliquer ce montant.
        </Alert>
      );
    } else {
      return (
        <Alert>
          Un accord d’entreprise peut prévoit un montant différent qu’il soit
          plus élevé ou plus faible. Dans ce cas, s’applique le montant prévu
          par l’accord d’entreprise, sauf si le contrat de travail prévoit un
          montant plus favorable pour le salarié. Attention, dans le cas où
          l’accord d’entreprise prévoit un taux inférieur à 10% dans la limite
          de 6 %, il doit y avoir des contreparties offertes au salarié,
          notamment sous la forme d’un accès privilégié à la formation
          professionnelle (action de formation, bilan de compétences)
        </Alert>
      );
    }
  }
  return (
    <Alert>
      Un accord d’entreprise peut prévoit un montant différent qu’il soit plus
      élevé ou plus faible. Dans ce cas, s’applique le montant prévu par
      l’accord d’entreprise, sauf si le contrat de travail prévoit un montant
      plus favorable pour le salarié.
    </Alert>
  );
}

function extractRefs(refs = []) {
  return refs.flatMap(({ refUrl, refLabel }) => {
    const urls = refUrl.split(/\n/);
    const labels = refLabel.split(/\n/);
    return urls.map((url, i) => ({ refUrl: url, ref: labels[i] }));
  });
}

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

  const idcc = ccn ? ccn.convention.num : 0;
  const [situationCdt] = getSituationsFor(data, { idcc: 0, contractType });
  const initialSituations = getSituationsFor(data, { idcc, contractType });
  const situations = filterSituations(initialSituations, criteria);

  let rate = "10%";
  let bonusAltName = "La prime de précarité";
  let legalRefs = [];
  let situation;
  switch (situations.length) {
    case 1: {
      [situation] = situations;
      rate = situation.rate || "0%";
      bonusAltName = situation.bonusLabel || bonusAltName;
      legalRefs = extractRefs([situation, situationCdt]);
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
      <SectionTitle>Montant</SectionTitle>
      <p>
        {bonusAltName} est estimée à&nbsp;
        <Highlight>{indemnite}&nbsp;€</Highlight>.
      </p>
      <Disclaimer situation={situation} />
      <SectionTitle>Détails du calcul</SectionTitle>
      <Heading>Éléments saisis :</Heading>
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
      <SectionTitle>Source</SectionTitle>
      {getRef(legalRefs)}
      <p>
        En savoir plus sur la prime de précarité d’un{" "}
        {contractType === CONTRACT_TYPE.CDD ? (
          <Link
            href="/fiche-service-public/[slug]"
            as={"/fiche-service-public/fin-dun-contrat-a-duree-determinee-cdd"}
          >
            <a target="_blank" rel="noopener noreferrer">
              salarié en CDD
            </a>
          </Link>
        ) : (
          <Link
            href="/fiche-service-public/[slug]"
            as={"/fiche-service-public/contrat-de-travail-temporaire-interim"}
          >
            <a target="_blank" rel="noopener noreferrer">
              salarié en contrat de travail temporaire (contrat d’intérim)
            </a>
          </Link>
        )}
      </p>
    </>
  );
}

export { StepIndemnite };

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
