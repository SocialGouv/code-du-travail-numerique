import { render } from "@testing-library/react";
import React from "react";

import Outils, { getStaticProps } from "../pages/outils";

jest.mock("../src/outils/service.ts");

describe("<Outils />", () => {
  let serverSideProps: Awaited<ReturnType<typeof getStaticProps>>;

  beforeAll(async () => {
    serverSideProps = await getStaticProps();
  });

  it("should display a list of tools", () => {
    const { queryAllByTestId } = render(<Outils {...serverSideProps.props} />);
    const items = queryAllByTestId("tools-list-items-internal");
    expect(items).toHaveLength(0);
  });
});
