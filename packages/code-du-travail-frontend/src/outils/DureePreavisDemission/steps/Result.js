import React from "react";
import PropTypes from "prop-types";

import { SectionTitle } from "../../common/stepStyles";

function StepResult() {
  return (
    <>
      <SectionTitle>Durée du préavis de démission</SectionTitle>
      <p>
        Le code du travail ne prévoit pas une durée précise du préavis de
        démission. Il prévoit qu’une convention collective ou un accord
        d’entreprise, voire un usage, en prévoit les durées et modalités.
      </p>
    </>
  );
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};
StepResult.computePreavis = () => {};
export { StepResult };
