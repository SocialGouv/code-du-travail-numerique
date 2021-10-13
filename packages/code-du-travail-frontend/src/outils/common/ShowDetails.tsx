import { Accordion } from "@socialgouv/cdtn-ui";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ShowDetails = ({ children }: Props): JSX.Element => (
  <Accordion
    items={[
      {
        body: { children },
        title: <p>Voir le détail du calcul</p>,
      },
    ]}
  />
);

export default ShowDetails;
