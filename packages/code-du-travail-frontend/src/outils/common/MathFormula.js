import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { theme } from "@socialgouv/react-ui";
import styled from "styled-components";

import("mathjax/es5/tex-svg");

const MathFormula = ({ math }) => {
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    if (window.MathJax && window.MathJax.tex2svg) {
      setReady(true);
    }
  }, []);
  if (isReady) {
    return (
      <Wrapper>
        <div
          dangerouslySetInnerHTML={{
            __html: window.MathJax.tex2svg("\\frac{a}{b}").outerHTML,
          }}
        />
      </Wrapper>
    );
  }
  return <div>Lohoooser</div>;
};

MathFormula.propTypes = {
  math: PropTypes.string,
};

const { spacings } = theme;

const Wrapper = styled.div`
  margin: ${spacings.base} 0;
`;

export default MathFormula;
