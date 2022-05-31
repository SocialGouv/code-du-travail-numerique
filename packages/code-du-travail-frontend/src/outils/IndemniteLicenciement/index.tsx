import PropTypes from "prop-types";
import React from "react";
import { IndemniteLicenciementSimulator } from "./components";
import {
  createIndemniteLicenciementStore,
  IndemniteLicenciementProvider,
} from "./state";

interface Props {
  icon: string;
  title: string;
  displayTitle: string;
  publicodesRules: any;
}

const CalculateurIndemnite = ({
  icon,
  title,
  displayTitle,
  publicodesRules,
}: Props): JSX.Element => {
  /**
   * The rules defined here allows to manage additionnal steps to the wizard
   */
  // const Rules = ({ dispatch }) => (
  //   <>
  //     <OnChange key="rule-same-salaire" name="hasSameSalaire">
  //       {(value) =>
  //         value === false
  //           ? dispatch({
  //               payload: { insertAfter: stepSalaires.name, step: stepPrime },
  //               type: "add_step",
  //             })
  //           : dispatch({ payload: stepPrime.name, type: "remove_step" })
  //       }
  //     </OnChange>
  //   </>
  // );

  return (
    <IndemniteLicenciementProvider
      createStore={() =>
        createIndemniteLicenciementStore(publicodesRules, title)
      }
    >
      <IndemniteLicenciementSimulator
        icon={icon}
        title={title}
        displayTitle={displayTitle}
      />
    </IndemniteLicenciementProvider>
  );
};

CalculateurIndemnite.propTypes = {
  initialState: PropTypes.object,
};

export { CalculateurIndemnite };
