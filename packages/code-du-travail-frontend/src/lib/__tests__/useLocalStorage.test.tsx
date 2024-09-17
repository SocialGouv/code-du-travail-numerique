import { act, render } from "@testing-library/react";
import React from "react";

import { useLocalStorageForAgreement } from "../useLocalStorage";

function renderApp(initialValue) {
  function App() {
    const [value, setValue] = useLocalStorageForAgreement(initialValue);
    return (
      <div data-testid="container">
        <p data-testid="value">{value}</p>
        <button data-testid="button" onClick={() => setValue("updated!")}>
          udpate
        </button>
      </div>
    );
  }

  return render(<App />);
}

describe("useLocalStorageForAgreement", () => {
  it("initializes value", () => {
    const { getByTestId } = renderApp("hello cdtn");
    const valueElement = getByTestId("value");
    expect(valueElement.innerHTML).toBe("hello cdtn");
  });
  it("updates value", () => {
    const { getByTestId } = renderApp("bar");
    act(() => {
      getByTestId("button").click();
    });
    const valueElement = getByTestId("value");
    expect(valueElement.innerHTML).toBe("updated!");
  });
});
