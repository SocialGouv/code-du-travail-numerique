import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { VerticalArrow } from "@cdt/ui-old";
import { theme, Wrapper } from "@socialgouv/react-ui";

const HIDDEN_KEY = "convention-explainer-hidden";

const Explainer = () => {
  const [isExplainerHidden, setIsExplainedHidden] = useState(true);

  useEffect(() => {
    setIsExplainedHidden(sessionStorage.getItem(HIDDEN_KEY) === "true");
  }, []);

  return (
    <StyledWrapper variant="dark">
      <Title
        href="#"
        aria-expanded={!isExplainerHidden}
        onClick={e => {
          e.preventDefault();
          sessionStorage.setItem(HIDDEN_KEY, (!isExplainerHidden).toString());
          setIsExplainedHidden(!isExplainerHidden);
        }}
      >
        Plus d’informations sur les conventions collectives
        <VerticalArrow />
      </Title>
      {!isExplainerHidden && (
        <>
          <SubTitle>Qu’est ce qu’une convention collective ?</SubTitle>
          <p>
            Une convention collective est un accord négocié entre des
            organisations syndicales de salariés et des organisations
            d’employeurs.
            <br />
            Elle permet d’aménager les règles issues du code du travail
            concernant les conditions d’emploi, la formation professionnelle, le
            travail des salariés et les garanties sociales aux spécificités des
            secteurs d’activité et géographiques concernés. Elle peut également
            prévoir d’autres mesures qui ne sont pas prévues par le code du
            travail.
          </p>
          <SubTitle>
            Une convention collective de branche s’applique-t-elle à ma
            situation ?
          </SubTitle>
          <p>
            Pour pouvoir s’appliquer à vous, la convention collective de branche
            doit être applicable à votre entreprise.
            <br />
            L’employeur a l’obligation d’appliquer la convention collective
            lorsque l’entreprise entre dans le champ d’application professionnel
            et géographie défini par la convention et que :
          </p>
          <ul>
            <li>
              La convention collective de branche a été étendue par le ministère
              du travail.
            </li>
            <li>
              L’entreprise est adhérente à une organisation patronale signataire
              de la convention collective.
            </li>
          </ul>
        </>
      )}
    </StyledWrapper>
  );
};

export default Explainer;

const { spacing } = theme;

const StyledWrapper = styled(Wrapper)`
  margin-bottom: ${spacing.interComponent};
`;

const Title = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubTitle = styled.p`
  text-decoration: underline;
`;
