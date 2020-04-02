import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import { theme } from "@socialgouv/react-ui";
import { format, parseISO } from "date-fns";
import { formatIdcc } from "@cdt/data";

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
        <a target="_blank" rel="noopener noreferrer nofollow" href={url}>
          Voir la convention sur Légifrance
        </a>
      </p>
    )}
    <p data-no-glossary>
      <Link href="/glossaire/convention-collective" passHref>
        <a target="_blank" rel="noopener noreferrer nofollow">
          Qu’est-ce qu’une convention collective&nbsp;?
        </a>
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
    url: PropTypes.string,
    idcc: PropTypes.string,
    date_publi: PropTypes.string,
  }).isRequired,
};

export { Info };
