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
  getRef,
} from "../../common/situations.utils";
import { CONTRACT_TYPE } from "../components/TypeContrat";

function Disclaimer({ situation, idcc }) {
  if (idcc > 0 && situation.idcc > 0) {
    if (situation.hasConventionalProvision) {
      return (
        <Alert>
          Un accord d’entreprise peut prévoir un montant différent qu’il soit
          plus élevé ou plus faible. Dans ce cas, s’applique le montant prévu
          par l’accord d’entreprise, sauf si le contrat de travail prévoit un
          montant plus favorable pour le salarié.
        </Alert>
      );
    } else {
      return (
        <Alert>
          Un accord d’entreprise peut prévoir un montant différent qu’il soit
          plus élevé ou plus faible. Dans ce cas, s’applique le montant prévu
          par l’accord d’entreprise, sauf si le contrat de travail prévoit un
          montant plus favorable pour le salarié.
          <br />
          Attention, dans le cas où l’accord d’entreprise prévoit un taux
          inférieur à 10% dans la limite de 6%, il doit y avoir des
          contreparties offertes au salarié, notamment sous la forme d’un accès
          privilégié à la formation professionnelle (action de formation, bilan
          de compétences).
        </Alert>
      );
    }
  }
  // case for no ccn provided or unhandled ccn
  return (
    <Alert>
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
    </Alert>
  );
}

function extractRefs(refs = []) {
  //some ref are duplicated so we need to dedup them

  const tempRefs = refs
    .filter((item) => item.refLabel && item.refUrl)
    .flatMap(({ refUrl, refLabel }) => {
      const urls = refUrl.split(/\n/);
      const labels = refLabel.split(/\n/);
      return urls.map((url, i) => ({ refUrl: url, refLabel: labels[i] }));
    });

  const refMap = {};
  for (const { refUrl, refLabel } of tempRefs) {
    refMap[refUrl] = refLabel;
  }
  return Object.entries(refMap).map(([refUrl, ref]) => ({
    refUrl,
    ref,
  }));
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
      if (situation.hasConventionalProvision) {
        rate = situation.rate;
      }
      bonusAltName = situation.bonusLabel || bonusAltName;
      if (idcc !== 0) {
        legalRefs = extractRefs([situation, situationCdt]);
      } else {
        legalRefs = extractRefs([situationCdt]);
      }
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
    rateLabel,
  });

  const entries = Object.entries({
    "convention collective": ccn
      ? situations.length > 0
        ? ccn.title
        : "La convention collective n'a pas été traitée par nos services."
      : "La convention collective n'a pas été renseignée.",
    ...inputs,
  });

  return (
    <>
      <SectionTitle>Montant</SectionTitle>
      <p>
        {bonusAltName} est estimée à&nbsp;
        <Highlight>{indemnite}&nbsp;€</Highlight>.
      </p>
      <Disclaimer situation={situation} idcc={idcc} />
      <SectionTitle>Détails du calcul</SectionTitle>
      <Heading>Éléments saisis :</Heading>
      {entries.length > 0 && (
        <List>
          {entries.map(([label, value], index) => (
            <Item key={index}>
              {label}&nbsp;: <strong>{value}</strong>
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
