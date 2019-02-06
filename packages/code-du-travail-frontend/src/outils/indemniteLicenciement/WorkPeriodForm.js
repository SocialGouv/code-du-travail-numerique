import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const WorkPeriodForm = React.forwardRef(function WorkPeriodFormRef(
  {
    period: { uid, type, duree = "", salaire = "", isValid },
    onSubmit,
    onChange
  },
  ref
) {
  return (
    <form onSubmit={onSubmit}>
      <Wrapper>
        <InlineLabel>
          <SpanLabel>type</SpanLabel>
          <SelectInput
            ref={ref}
            name="type"
            onChange={onChange}
            onBlur={onChange}
            value={type}
          >
            <option value="temps-partiel">Temps partiel</option>
            <option value="temps-plein">Temps plein</option>
          </SelectInput>
        </InlineLabel>
        <InlineLabel>
          <SpanLabel>durée (en mois)</SpanLabel>
          <DureeInput
            onChange={onChange}
            type="number"
            min="0"
            name="duree"
            placeholder="8 mois"
            value={duree}
          />
        </InlineLabel>
        <InlineLabel>
          <SpanLabel>salaire mensuel</SpanLabel>
          <SalaireInput
            onChange={onChange}
            type="number"
            min="0"
            name="salaire"
            placeholder="€"
            value={salaire}
          />
        </InlineLabel>
        {uid ? (
          <button className="btn" disabled={!isValid}>
            Modifier la période
          </button>
        ) : (
          <button className="btn" disabled={!isValid}>
            Ajouter la période
          </button>
        )}
      </Wrapper>
    </form>
  );
});

WorkPeriodForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  period: PropTypes.shape({
    uid: PropTypes.string,
    type: PropTypes.string,
    duree: PropTypes.string,
    salaire: PropTypes.string
  }).isRequired
};

export { WorkPeriodForm };

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
`;
const SelectInput = styled.select`
  width: 14rem;
`;

const DureeInput = styled.input`
  width: 8.5rem;
`;
const SalaireInput = styled.input`
  width: 8.5rem;
`;
const InlineLabel = styled.label`
  position: relative;
`;
const SpanLabel = styled.span`
  display: block;
  position: absolute;
  top: -1.5rem;
`;
