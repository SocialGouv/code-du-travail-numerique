import React from "react";

// génère le fil d'ariane depuis une liste type [{title: 'page 1'}, {title: 'page 2'}]

const BreadCrumbEntry = ({ title, onClick, isLast }) => (
  <React.Fragment>
    <li className="breadcrumb-item">
      <a
        role={isLast ? null : "button"}
        tabIndex={isLast ? null : 0}
        disabled={isLast}
        underline={!isLast}
        onClick={onClick}
        title={title}
      >
        {title}
      </a>
    </li>
    {!isLast}
  </React.Fragment>
);

const BreadCrumbs = ({ entries, onClick }) => {
  const allEntries =
    (entries.length && [
      {
        title: "Accueil"
      },
      ...entries
    ]) ||
    [];
  return (
    <div className="section-dark">
      <div className="container">
        <nav className="breadcrumb" aria-label="breadcrumb">
          <ol className="breadcrumb">
            {allEntries.map((entry, i) => (
              <BreadCrumbEntry
                key={entry.title + i}
                onClick={() => onClick(entry, i)}
                isLast={i === allEntries.length - 1}
                {...entry}
              />
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumbs;
