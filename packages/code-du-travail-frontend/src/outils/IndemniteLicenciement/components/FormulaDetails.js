import React from "react";
import PropTypes from "prop-types";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";
import MathJax from "react-mathjax-preview";

import { ErrorBoundary } from "../../../common/ErrorBoundary";
import { Summary } from "../../common/stepStyles";

function FormulaDetails({ infoCalcul: { labels, formula } }) {
  return (
    <Details>
      <Summary>Voir le détail du calcul</Summary>
      <HeadingDetails>Élements saisis :</HeadingDetails>
      <ListDetails>
        {Object.entries(labels).map(([label, value], index) => (
          <ItemDetails key={index}>
            {label}&nbsp;: {value}
          </ItemDetails>
        ))}
      </ListDetails>
      <ErrorBoundary>
        <HeadingDetails>Formule</HeadingDetails>
        <FormuleWrapper>
          <MathJax math={"`" + formula + "`"} />
        </FormuleWrapper>
      </ErrorBoundary>
    </Details>
  );
}

export { FormulaDetails };

FormulaDetails.propTypes = {
  infoCalcul: PropTypes.shape({
    labels: PropTypes.object.isRequired,
    formula: PropTypes.string.isRequired
  })
};

const { spacings, fonts } = theme;

const Details = styled.details`
  margin-top: ${spacings.medium};
`;

const HeadingDetails = styled.strong`
  font-weight: bold;
  font-size: ${fonts.sizes.small};
`;

const ListDetails = styled.ul`
  list-style-type: disc;
`;

const ItemDetails = styled.li`
  font-size: ${fonts.sizes.small};
`;

const FormuleWrapper = styled.div`
  margin: ${spacings.base} 0;
`;
