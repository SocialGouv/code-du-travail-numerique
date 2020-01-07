import React from "react";
import { StepInfoCCnOptionnal } from "../../common/InfosCCn";

const StepInfoCCn = props => <StepInfoCCnOptionnal {...props} />;

export { StepInfoCCn };

// StepInfoCCn.validate = values => {
//   const errors = {};
//   const { ccn, cdt, disabledWorker } = values;
//   const initialCDTSituations = getSituationsFor(data.situations, {
//     idcc: 0
//   });
//   const [situation] = filterSituations(initialCDTSituations, {
//     ...cdt
//   });

//   if (ccn && isNotYetProcessed(data.situations, ccn.convention.num)) {
//     errors.ccn = (
//       <>
//         <p>
//           Nous n’avons pas encore traité cette convention collective.
//           <br />
//           Le code du travail prévoit une durée du préavis de licenciement de{" "}
//           <Highlight>
//             {getResult({
//               durationCDT: situation.duration,
//               durationCC: 0,
//               disabledWorker
//             })}
//           </Highlight>
//           <br />
//           Une durée plus favorable au salarié peut être prévue dans la
//           convention collective, un accord d’entreprise, le contrat de travail
//           ou un usage dans l’entreprise.
//         </p>
//       </p>
//     );
//   }
//   return errors;
// };
