import React, { useState } from "react";
import ReactDOM from "react-dom";

import SearchIdcc from "./SearchIdcc";

// todo: use @socialgouv/kali-data
import kali from "./kali.json";

// normalize idcc nums
const formatIdCc = num => {
  while (num.length < 4) num = "0" + num;
  return num;
};

// link to a CC
const CC = ({ idcc }) => {
  const data = kali.find(c => formatIdCc(c.num) === formatIdCc(idcc));
  if (data) {
    return (
      <div style={{ margin: "5px 0" }}>
        <a
          target="_blank"
          rel="noopener nofollow"
          href={`https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${
            data.id
          }`}
        >
          <span className="badge badge-primary">{idcc}</span> {data.titre}
        </a>
      </div>
    );
  }
  return <div>IDCC {idcc}</div>;
};

// demo app
// userland UI
function App() {
  const [query, setQuery] = useState("");
  const onInputChange = e => {
    const value = e.target.value;
    setQuery(value);
  };

  return (
    <div className="container">
      <br />
      <br />
      <h3>Recherche de convention collective</h3>
      <br />
      <p>
        Saisissez le nom de votre entreprise, la convention collective ou le
        numéro SIRET
      </p>
      <input
        className="form-control"
        placeholder="Ex: 'Corso Balard' ou '82161143100015' ou '1486' "
        value={query}
        type="text"
        onChange={onInputChange}
      />
      <SearchIdcc
        query={query}
        render={({ status, results }) =>
          (
            <div style={{ marginTop: 25 }}>
              {status === "loading" && (
                <div>Recherche des convention collectives..</div>
              )}
              {status === "error" && (
                <div>Aucun résultat pour votre recherche.</div>
              )}
              {status === "success" && results && results.length ? (
                <table className="table table-striped">
                  <tbody>
                    {results
                      .filter(
                        result =>
                          result.idcc && result.idcc.map && result.idcc.length
                      )
                      .map(result => (
                        <tr key={result.id}>
                          <td>
                            <div style={{ fontSize: "1.2em" }}>
                              {result.label}{" "}
                              {result.siret && (
                                <span className="badge badge-light">
                                  <a
                                    target="_blank"
                                    rel="noopener nofollow"
                                    href={`https://entreprise.data.gouv.fr/etablissement/${
                                      result.siret
                                    }`}
                                  >
                                    {result.siret}
                                  </a>
                                </span>
                              )}
                            </div>
                            <div style={{ marginTop: 5, marginLeft: 10 }}>
                              {result.idcc.length ? (
                                result.idcc.map(id => <CC key={id} idcc={id} />)
                              ) : (
                                <div className="text-danger">
                                  Aucune convention collective connue pour cette
                                  entreprise
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                ""
              )}
            </div>
          ) || null
        }
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
