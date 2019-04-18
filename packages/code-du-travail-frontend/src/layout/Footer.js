import React from "react";
import getConfig from "next/config";
import styled from "styled-components";
import { ToggleButton, List, theme } from "@cdt/ui";

import { Link } from "../../routes";
import ServiceRenseignementModal from "../common/ServiceRenseignementModal";

const { publicRuntimeConfig } = getConfig();

const Footer = () => (
  <footer className="site-footer" id="footer">
    <div className="container">
      <Support>
        <h2>Besoin d’un accompagnement personnalisé ?</h2>
        <p>
          Les services de renseignement en droit du travail peuvent vous donner
          des informations juridiques générales relatives au Code du travail,
          aux conventions collectives, à la jurisprudence. Ils peuvent également
          vous conseiller et vous orienter dans vos démarches.
        </p>
        <ServiceRenseignementModal>
          <ToggleButton primary>
            Contacter les services de renseignement
          </ToggleButton>
        </ServiceRenseignementModal>
      </Support>
      <Links>
        <div>
          <LinkTitle>Code du travail numérique</LinkTitle>
          <List
            items={[
              <ItemWrapper key="0">
                <Link route="about">
                  <a>À propos</a>
                </Link>
              </ItemWrapper>,
              <ItemWrapper key="1">
                <a href="mailto:contact@code-du-travail.beta.gouv.fr">
                  Contact
                </a>
              </ItemWrapper>
            ]}
          />
        </div>
        <div>
          <LinkTitle>Aidez-nous à améliorer cet outil</LinkTitle>
          <List
            items={[
              <ItemWrapper key="0">
                <a
                  href={
                    "https://github.com/SocialGouv/code-du-travail-numerique/tree/v" +
                    publicRuntimeConfig.PACKAGE_VERSION
                  }
                  className="external-link__after"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contribuer sur Github
                </a>
              </ItemWrapper>,
              <ItemWrapper key="1">
                <a
                  href={
                    "https://github.com/SocialGouv/code-du-travail-numerique/releases/tag/v" +
                    publicRuntimeConfig.PACKAGE_VERSION
                  }
                  className="external-link__after"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Journal des modifications
                </a>
              </ItemWrapper>
            ]}
          />
        </div>
        <div>
          <LinkTitle>En collaboration avec</LinkTitle>
          <List
            items={[
              <ItemWrapper key="0">
                <a
                  href={
                    "https://travail-emploi.gouv.fr/ministere/organisation/article/dgt-direction-generale-du-travail"
                  }
                  className="external-link__after"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  La direction générale du travail
                </a>
              </ItemWrapper>,
              <ItemWrapper key="1">
                <a
                  href={"https://incubateur.social.gouv.fr/"}
                  className="external-link__after"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  L’incubateur des ministères sociaux
                </a>
              </ItemWrapper>,
              <ItemWrapper key="2">
                <a
                  href={"https://beta.gouv.fr/"}
                  className="external-link__after"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  beta.gouv.fr
                </a>
              </ItemWrapper>
            ]}
          />
        </div>
      </Links>
    </div>
  </footer>
);

export default Footer;

const { colors, fonts, spacing } = theme;

const Support = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.interComponent} 0;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${spacing.interComponent};
`;

const LinkTitle = styled.h3`
  font-size: ${fonts.sizeBase};
  font-weight: 700;
`;

const ItemWrapper = styled.div`
  margin: ${spacing.xsmall} 0;
  a {
    color: ${colors.darkText};
  }
`;
