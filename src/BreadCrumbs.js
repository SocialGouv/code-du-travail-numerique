import React from "react";
import styled from "styled-components";

// génère le fil d'ariane depuis une liste type [{title: 'page 1'}, {title: 'page 2'}]

const StyledBread = styled.button`
  text-decoration: ${props => props.underline && "underline"};
  font-weight: ${props => !props.underline && "bold"};

  cursor: pointer;
  color: #0069cf;
  margin: 3px 0 0 0;
  background: white;
  border: 0;
  position: relative;
  padding: 10px 40px;
  height: 36px;
  box-sizing: border-box;

  &:focus,
  &:focus::after,
  &:hover,
  &:hover::after {
    text-decoration: none;
    background: #cbe6f8;
  }

  /* Breadcrumbs inspired by https://codepen.io/AxeLVaisper/pen/dqxjb */
  &::after {
    background: white;
    box-shadow: 2px -2px 0 2px #eee;
    content: "";
    position: absolute;
    top: 0;
    right: -18px;
    width: 36px;
    height: 36px;
    transform: scale(0.707) rotate(45deg);
    z-index: 1;
  }
`;

const BreadCrumbEntry = ({ title, onClick, isLast }) => (
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
    {!isLast}
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
