import React, { useState, useEffect } from "react";
import { Section } from "@cdt/ui";
import styled from "styled-components";

const storedExpandedKey = "isConventionExplainerExpanded";

const ConventionExplainer = () => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const expanded = sessionStorage.getItem(storedExpandedKey) == "true";
    setExpanded(expanded);
  });

  return (
    <Section className="wrapper-dark">
      <ExpandWrapper>
        <Button
          onClick={e => {
            e.preventDefault();
            sessionStorage.setItem(storedExpandedKey, !expanded);
            setExpanded(!expanded);
          }}
        >
          {expanded ? "▲" : "▼"}
        </Button>
      </ExpandWrapper>
      <Title>Explications sur les conventions collectives nationales</Title>
      {expanded && (
        <React.Fragment>
          <p>
            <SubTitle>
              Qu&apos;est ce qu&apos;une convention collective ?
            </SubTitle>
            Une convention collective est un accord négocié entre des
            organisations syndicales de salariés et des organisations
            d&apos;employeurs.
            <br />
            Elle permet d&apos;aménager les règles issues du code du travail
            concernant les conditions d&apos;emploi, la formation
            professionnelle, le travail des salariés et de leurs garanties
            sociales aux spécificités du secteurs d&apos;activité et
            géographique concernés. Elle peut également prévoir d&apos;autres
            mesures qui ne sont pas prévues par le code du travail.
          </p>
          <p>
            <SubTitle>
              Une convention collective de branche s&apos;applique-t-elle à ma
              situation ?
            </SubTitle>
            Pour pouvoir s&apos;appliquer à vous, la convention collective de
            branche doit être applicable à votre entreprise.
            <br />
            Lorsque votre entreprise entre dans le champ professionnel et
            géographique d&apos;une convention collective de branche, il existe
            deux situations dans lesquelles votre entreprise a l&apos;obligation
            de l&apos;appliquer :
            <br />
            - soit une convention collective de branche a été étendue par le
            Ministère du travail rendant la convention collective obligatoire
            pour toutes les entreprises qui entrent dans son champ
            d&apos;application professionnel et géographique.
            <br />- soit votre entreprise est signataire ou adhérente à une
            organisation patronale signataire de la convention collective.
          </p>
        </React.Fragment>
      )}
    </Section>
  );
};

const Button = styled.button`
  padding: 2px;
`;

const ExpandWrapper = styled.div`
  float: right;
`;

const Title = styled.p`
  font-weight: bold;
`;

const SubTitle = styled.p`
  text-decoration: underline;
`;

export default ConventionExplainer;
