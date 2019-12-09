import React from "react";
import PropTypes from "prop-types";
import { Toast } from "@socialgouv/react-ui";
import data from "@cdt/data...preavis-demission/data.json";

import { SectionTitle, Highlight } from "../../common/stepStyles";

import {
  filterSituations,
  getSituationsFor,
  recapSituation,
  getRef
} from "../../common/situations.utils";

function StepResult({ form }) {
  const { values } = form.getState();
  const { ccn, criteria = {} } = values;
  const idcc = ccn ? ccn.num : "0";

  const initialSituations = getSituationsFor(data.situations, { idcc });
  const possibleSituations = filterSituations(initialSituations, criteria);

  /**
   * NOTE @lionelb
   * this code is never executed since users can't
   * go to the results with an un processed agreement
   */
  // if (!possibleSituations.length && isNotYetProcessed(data.situations, idcc)) {
  //   return (
  //     <>
  //       <Toast>
  //         Nous n’avons pas encore traité cette convention collective. Le code du
  //         travail ne prévoyant pas de durée précise du préavis de démission,
  //         nous vous invitons à consulter le contenu de la convention collective.
  //         <br />
  //         <Link
  //           href="/fiche-service-public/[slug]"
  //           as={`/fiche-service-public/${ccn.slug}`}
  //         >
  //           <a>{ccn.title}</a>
  //         </Link>
  //       </Toast>
  //     </>
  //   );
  // }

  switch (possibleSituations.length) {
    case 1: {
      const [situation] = possibleSituations;
      const { idcc } = situation;
      const { title: ccLabel } = ccn;
      if (idcc === "0") {
        return (
          <>
            <p>
              Le code du travail ne prévoit pas une durée précise du préavis de
              démission. Il prévoit qu’une convention collective ou un accord
              d’entreprise, voire un usage, en prévoit les durées et modalités.
            </p>
            {situation.ref && situation.refUrl && getRef(situation)}
          </>
        );
      }
      return (
        <>
          <SectionTitle>Durée du préavis</SectionTitle>
          <p>
            À partir des éléments que vous avez saisis, la durée du préavis de
            démission est estimée à&nbsp;:
          </p>
          <p>
            <Highlight>{situation.answer}</Highlight>.
          </p>
          <Toast>
            Une durée de préavis de licenciement plus favorable au salarié peut
            aussi être prévue dans un accord d’entreprise, le contrat de travail
            ou un usage dans la localité ou la profession.
          </Toast>
          <SectionTitle>Détails</SectionTitle>
          <p>Élements saisis&nbsp;:</p>
          {recapSituation({
            "Convention collective": `${ccLabel} (${idcc})`,
            ...situation.criteria
          })}
          <SectionTitle>Source</SectionTitle>
          {situation.ref && situation.refUrl && getRef(situation)}
        </>
      );
    }
    default:
      return <>La situation du salarié ne permet de répondre précisement.</>;
  }
}

StepResult.propTypes = {
  form: PropTypes.shape({
    getState: PropTypes.func.isRequired
  })
};

export { StepResult };
