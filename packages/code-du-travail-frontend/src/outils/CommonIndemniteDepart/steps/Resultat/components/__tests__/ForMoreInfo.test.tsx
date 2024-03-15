import { render } from "@testing-library/react";
import React from "react";
import ForMoreInfo from "../ForMoreInfo";
import Link from "next/link";

describe("<ForMoreInfo />", () => {
  it("should render", () => {
    const { queryByText } = render(
      <ForMoreInfo
        article={
          <p>
            Pour en savoir plus sur l’indemnité de licenciement et son mode de
            calcul, consultez{" "}
            <Link
              href={`/fiche-service-public/indemnite-de-licenciement-du-salarie-en-cdi`}
              passHref
              target={"_blank"}
            >
              cet article
            </Link>
            .
          </p>
        }
      />
    );
    expect(
      queryByText(/Pour en savoir plus sur l’indemnité de licenciement/i)
    ).toBeInTheDocument();
  });
});
