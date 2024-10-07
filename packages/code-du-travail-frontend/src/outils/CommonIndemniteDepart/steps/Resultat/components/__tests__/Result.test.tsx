import { render } from "@testing-library/react";
import React from "react";
import Result from "../Result";

describe("<Result />", () => {
  it("should render", () => {
    const { queryByText } = render(
      <Result
        maxResult="2000"
        resultMessage="Le résultat est :"
        notifications={[
          {
            dottedName: "default notification 1",
            description: (
              <span>
                Ce montant est exonéré d’impôt sur le revenu et de cotisations
                sociales sous certaines conditions.
              </span>
            ),
            show: "légal et conventionnel",
          },
        ]}
      />
    );
    expect(queryByText(/2 000/i)).toBeInTheDocument();
    expect(
      queryByText(/Ce montant est exonéré d’impôt sur le revenu/)
    ).toBeInTheDocument();
  });
});
