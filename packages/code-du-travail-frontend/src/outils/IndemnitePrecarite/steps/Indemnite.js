import React from "react";
import { theme, Toast } from "@cdt/ui";
import styled from "styled-components";
import MathJax from "react-mathjax-preview";

import { getIndemnitePrecarite } from "../indemnite";
import { Summary, Highlight, SectionTitle } from "../../common/stepStyles";
import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { Link } from "../../../../routes";

function StepIndemnite({ form }) {
  const state = form.getState();
  const { contrat, typeRemuneration, salaires, salaire } = state.values;
  const { indemnite, formule, inputs } = getIndemnitePrecarite({
    typeRemuneration,
    salaire,
    salaires
  });

  const altName =
    contrat === "cdd"
      ? "indemnité de fin de CDD"
      : "indemnité de fin de mission";
  const entries = Object.entries(inputs);

  return (
    <>
      <SectionTitle>Prime de précarité</SectionTitle>
      <p>
        Votre prime de précarité (appelée également <em>{altName}</em>) est
        estimée à <Highlight>{indemnite}</Highlight> €.
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
      {contrat === "cdd" && (
        <Toast variant="info">
          Attention : l’estimation est basée sur le montant de la prime de
          précarité prévu par le code du travail qui est de 10% de la
          rémunération totale brute perçue par le salarié. Une convention ou un
          accord collectif de branche étendu ou une convention ou un accord
          d’entreprise ou d’établissement peut prévoir de limiter le montant de
          l’indemnité à hauteur de 6 %, dès lors que des contreparties sont
          offertes à ces salariés, notamment sous la forme d’un accès privilégié
          à la formation professionnelle.
        </Toast>
      )}
      <p>
        En savoir plus sur la prime de précarité d’un{" "}
        {contrat === "cdd" ? (
          <Link
            route="fiche-service-public"
            params={{ slug: "fin-dun-contrat-a-duree-determinee-cdd" }}
          >
            <a>salarié en CDD</a>
          </Link>
        ) : (
          <Link
            route="fiche-service-public"
            params={{ slug: "contrat-de-travail-temporaire-interim" }}
          >
            <a>salarié en contrat de travail temporaire (contrat d’intérim)</a>
          </Link>
        )}
      </p>
    </>
  );
}

export { StepIndemnite };

const { spacing, fonts } = theme;

const Heading = styled.strong`
  font-weight: bold;
  font-size: ${fonts.sizeSmall};
`;
const List = styled.ul`
  list-style-image: url("data:image/svg+xml;,${encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 6 10'><path fill='currentColor' d='M0 4h5v1H0z'/></svg>"
  )}");
`;
const Item = styled.li`
  font-size: ${fonts.sizeSmall};
`;
const FormuleWrapper = styled.div`
  margin: ${spacing.base} 0;
`;
