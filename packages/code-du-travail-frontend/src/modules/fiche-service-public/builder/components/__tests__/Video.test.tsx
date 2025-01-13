import React from "react";
import { render } from "@testing-library/react";
import videoDataMock from "./mocks/videoData.json";
import { FicheSPDataVideo } from "../../type";
import Video from "../Video";

describe("<Video />", () => {
  it("should render", () => {
    const { container } = render(
      <Video data={videoDataMock as FicheSPDataVideo} />
    );
    expect(container).toMatchSnapshot();
  });
});
