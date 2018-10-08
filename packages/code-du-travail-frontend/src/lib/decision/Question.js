import React from "react";

import { Section } from "@socialgouv/code-du-travail-ui";

const Question = ({ text, answers, onClick = () => {} }) =>
  text &&
  answers && (
    <Section light>
      <React.Fragment>
        <h5>
          Votre recherche renvoie beaucoup de résultats, pouvez-vous nous
          préciser
        </h5>
        <p>{text}</p>
        <div style={{ marginLeft: -5, marginTop: 10 }}>
          {answers &&
            answers.map(answer => (
              <button
                type="button"
                style={{
                  margin: 5,
                  padding: "2px 10px",
                  fontSize: "1.2em",
                  backgroundColor: "#dedede"
                }}
                key={answer}
                className="btn btn__secondary"
                onClick={() => onClick(answer)}
              >
                {answer}
              </button>
            ))}
        </div>
      </React.Fragment>
    </Section>
  );

export default Question;
