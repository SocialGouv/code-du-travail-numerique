import { Button } from "@socialgouv/cdtn-ui";
import { act, render, waitFor } from "@testing-library/react";
import React from "react";

import { SurveyModal } from "..";

jest.useFakeTimers();
beforeEach(() => {
  localStorage.clear();
});

describe("<SurveyModal />", () => {
  const BUTTON_LABEL = "Afficher";
  it("renders", async () => {
    const { container, getByText } = render(
      <SurveyModal>
        {({ setModalVisible }) => (
          <Button
            small
            onClick={() => {
              setModalVisible(true);
            }}
          >
            {BUTTON_LABEL}
          </Button>
        )}
      </SurveyModal>
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(container).toMatchSnapshot();
    const openBtn = getByText(BUTTON_LABEL);
    openBtn.click();
    await waitFor(() => getByText(/QUESTION/i));
    expect(container).toMatchSnapshot();
  });
  it("provides the correct prop value if disable_survey_0 is set to true", async () => {
    localStorage.setItem("disable_survey_0", "true");
    let query;
    act(() => {
      const { queryByText } = render(
        <SurveyModal>
          {({ isSurveyDisabled }) =>
            !isSurveyDisabled && <Button small>{BUTTON_LABEL}</Button>
          }
        </SurveyModal>
      );
      query = queryByText;
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(query(BUTTON_LABEL)).toBeNull();
  });
});
