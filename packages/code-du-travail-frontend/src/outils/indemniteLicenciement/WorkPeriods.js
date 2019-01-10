import React from "react";
import PropTypes from "prop-types";
import { Button } from "@cdt/ui";
import styled from "styled-components";

function WorkPeriods({ periods, onEdit, onDelete }) {
  const body = periods.map(item => (
    <WorkPeriod
      key={item.uid}
      data={item}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  ));

  return (
    <Table>
      <Thead>
        <tr>
          <TextTh>Type</TextTh>
          <NumericTh>Durée</NumericTh>
          <NumericTh>Salaire</NumericTh>
          <EmptyTh />
        </tr>
      </Thead>
      <tbody>{body}</tbody>
    </Table>
  );
}
WorkPeriods.propTypes = {
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      duree: PropTypes.string.isRequired,
      salaire: PropTypes.string.isRequired
    }).isRequired
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

WorkPeriods.defaultProps = {
  onEdit: null
};

export { WorkPeriods };

const Table = styled.table`
  border: none;
  width: 100%;
  margin-top: 1rem;
`;
const Thead = styled.thead`
  background: none;
`;

const TextTh = styled.th`
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const NumericTh = styled.th`
  text-align: right;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;
const EmptyTh = styled.th`
  border-color: transparent;
`;

const TextCell = styled.td`
  text-align: left;
  border: none;
`;
const Numericcell = styled.td`
  text-align: right;
  border: none;
`;
const Unit = styled.span`
  font-size: 0.8rem;
  opacity: 0.8;
`;
const Actions = styled.td`
  width: 25%;
  white-space: nowrap;
  border: none;
`;

const WorkPeriod = ({ onEdit, onDelete, data }) => (
  <tr>
    <TextCell>
      {data.type === "temps-partiel" ? "Temps partiel" : "Temps plein"}
    </TextCell>
    <Numericcell>
      {data.duree}
      <Unit>mois</Unit>
    </Numericcell>
    <Numericcell>
      {data.salaire}
      <Unit>€</Unit>
    </Numericcell>
    <Actions>
      <Button
        link
        onClick={() => {
          onEdit(data);
        }}
      >
        Modifier
      </Button>
      {" – "}
      <Button
        link
        onClick={() => {
          onDelete(data);
        }}
      >
        Supprimer
      </Button>
    </Actions>
  </tr>
);
