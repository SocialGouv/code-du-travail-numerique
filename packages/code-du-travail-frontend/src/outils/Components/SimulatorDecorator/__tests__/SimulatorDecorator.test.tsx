import { render } from "@testing-library/react";
import React from "react";
import SimulatorDecorator from "../index";
import { FormApi } from "final-form";

type FormState = {
  name?: string;
};

const callback: (values: FormState, form: FormApi<FormState>) => void = () => {
  /* nothing to do */
};
const onFormStepSubmit = jest.fn(callback);

describe("SimulatorDecorator", () => {
  describe("Render a step", () => {
    it("should show all information provided to the decorator", () => {
      const { getByText } = render(
        <SimulatorDecorator<FormState>
          initialValues={{ name: "John" }}
          title={{ title: "Titre du simulateur" }}
          navigation={{ showNext: true }}
          steps={{
            activeIndex: 0,
            steps: [],
          }}
          onFormStepSubmit={onFormStepSubmit}
          debug={<></>}
          renderStep={(values) => <>Nom: {values.getState().values.name}</>}
          annotations={<>Rendu des annotations</>}
        />
      );
      expect(getByText(/Nom: John/)).toBeInTheDocument();
      expect(getByText(/Rendu des annotations/)).toBeInTheDocument();
      expect(getByText(/Titre du simulateur/)).toBeInTheDocument();

      const startButton = getByText(/Commencer/);
      expect(startButton).toBeInTheDocument();
      startButton.click();
      expect(onFormStepSubmit).toBeCalledTimes(1);
    });
  });
});
