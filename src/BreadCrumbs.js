import React from "react";
import styled from "styled-components";

// génère le fil d'ariane depuis une liste type [{title: 'page 1'}, {title: 'page 2'}]

const StyledBread = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  color: black;
  text-decoration: ${props => props.underline && "underline"};
`;

const BreadCrumbEntry = ({ title, onClick, isLast, separator = " > " }) => (
  <React.Fragment>
    <StyledBread
      role={isLast ? null : "button"}
      tabIndex={isLast ? null : 0}
      disabled={isLast}
      underline={!isLast}
      onClick={onClick}
      title={title}
    >
      {title}
    </StyledBread>
    {!isLast && separator}
  </React.Fragment>
);

const BreadCrumbs = ({ entries, onClick, style }) => {
  const allEntries =
    (entries.length && [
      {
        title: "Accueil"
      },
      ...entries
    ]) ||
    [];
  return (
    <div style={style}>
      {allEntries.map((entry, i) => (
        <BreadCrumbEntry
          key={entry.title + i}
          onClick={() => onClick(entry, i)}
          isLast={i === allEntries.length - 1}
          {...entry}
        />
      ))}
    </div>
  );
};

export default BreadCrumbs;
