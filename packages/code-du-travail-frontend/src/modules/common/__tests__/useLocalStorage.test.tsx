import { act, render } from "@testing-library/react";
import React from "react";

import {
  AGREEMENT_STORAGE_EVENT,
  useLocalStorageForAgreement,
  useLocalStorageForAgreementOnPageLoad,
} from "../../utils/useLocalStorage";

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

  it("dispatches an agreement storage event when updating", () => {
    const listener = jest.fn();
    window.addEventListener(AGREEMENT_STORAGE_EVENT, listener as any);

    const { getByTestId } = renderApp("bar");
    act(() => {
      getByTestId("button").click();
    });

    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(AGREEMENT_STORAGE_EVENT, listener as any);
  });
});

describe("useLocalStorageForAgreementOnPageLoad", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  function renderPageLoadApp() {
    function App() {
      const [value] = useLocalStorageForAgreementOnPageLoad();
      return <p data-testid="cc">{value ? value.shortTitle : "aucune"}</p>;
    }
    return render(<App />);
  }

  it("se synchronise en direct quand le header supprime la convention collective", () => {
    localStorage.setItem(
      "convention",
      JSON.stringify({
        num: 1388,
        id: "1388",
        shortTitle: "Industrie du pétrole",
      })
    );

    const { getByTestId } = renderPageLoadApp();
    expect(getByTestId("cc").innerHTML).toBe("Industrie du pétrole");

    act(() => {
      localStorage.removeItem("convention");
      window.dispatchEvent(
        new CustomEvent(AGREEMENT_STORAGE_EVENT, { detail: null })
      );
    });

    expect(getByTestId("cc").innerHTML).toBe("aucune");
  });
});
