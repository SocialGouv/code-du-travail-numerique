import { formatIdcc } from "@socialgouv/modeles-social";
import { theme } from "@socialgouv/cdtn-ui";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "../../common/A11yLink";

const Detail = ({ label, children }) => (
  <StyledDetail>
    <DetailLabel>{label} :</DetailLabel>
    {children}
  </StyledDetail>
);

const Info = ({ convention: { num, title, date_publi, url } }) => (
  <React.Fragment>
    <Detail label="Nom complet">{title}</Detail>
    <Detail label="IDCC">{formatIdcc(num)}</Detail>
    {date_publi && (
      <Detail label="Date d’entrée en vigueur">
        {format(parseISO(date_publi), "dd/MM/yyyy")}
      </Detail>
    )}
    {url && (
      <p data-no-glossary>
        <A11yLink target="_blank" rel="noopener noreferrer nofollow" href={url}>
          Voir la convention sur Légifrance
        </A11yLink>
      </p>
    )}
    <p data-no-glossary>
      <Link href="/glossaire/convention-collective" passHref legacyBehavior>
        <A11yLink target="_blank" rel="noopener noreferrer nofollow">
          Qu’est-ce qu’une convention collective&nbsp;?
        </A11yLink>
      </Link>
    </p>
  </React.Fragment>
);

const { spacings } = theme;

const StyledDetail = styled.div`
  margin-bottom: ${spacings.medium};
`;

const DetailLabel = styled.div`
  display: inline-block;
  margin-right: 10px;
  font-weight: bold;
`;

Info.propTypes = {
  convention: PropTypes.shape({
    date_publi: PropTypes.string,
    idcc: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export { Info };
