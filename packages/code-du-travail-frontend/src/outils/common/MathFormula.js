import React from "react";
import PropTypes from "prop-types";
import MathJax from "react-mathjax-preview";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

const MathFormula = ({ math }) => {
  return (
    <Wrapper>
      <MathJax
        script="/static/mathjax/MathJax.js?config=TeX-MML-AM_HTMLorMML"
        math={"`" + math + "`"}
      />
    </Wrapper>
  );
};

MathFormula.propTypes = {
  math: PropTypes.string,
};

const { spacings } = theme;

const Wrapper = styled.div`
  margin: ${spacings.base} 0;
`;

export default MathFormula;
