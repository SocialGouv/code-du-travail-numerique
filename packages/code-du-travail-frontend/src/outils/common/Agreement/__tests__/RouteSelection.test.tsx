import { render } from "@testing-library/react";
import React from "react";

import { EmbeddedInjectedForm } from "../../../../../test/TestForm";
import { RouteSelection } from "../RouteSelection";

describe("RouteSelection: Skip the agreement selection", () => {
  describe("without data in form", () => {
    it("should render the mandatory question 'Je ne souhaite pas renseigner ma convention collective.'", () => {
      const { getByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      expect(
        getByText(/Je ne souhaite pas renseigner ma convention collective/)
      ).toBeInTheDocument();
      expect(getByText("(obligatoire)")).toBeInTheDocument();
    });

    it("should show all routes", () => {
      const { getByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      expect(
        getByText(/Je connais ma convention collective/)
      ).toBeInTheDocument();
      expect(
        getByText(/Je ne connais pas ma convention collective/)
      ).toBeInTheDocument();
      expect(
        getByText(/Je ne souhaite pas renseigner ma convention collective/)
      ).toBeInTheDocument();
    });

    it("should show an alert when submit without select an option", () => {
      const { getByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      getByText("Submit").click();
      expect(getByText(/Vous devez répondre à cette question/)).toBeDefined();
    });

    it("should show an alert when select to skip the agreement selection", () => {
      const { getByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      getByText(
        /Je ne souhaite pas renseigner ma convention collective/
      ).click();

      expect(
        getByText(
          /Vous pouvez passer cette étape et poursuivre la simulation pour connaitre la durée prévue par le code du travail/
        )
      ).toBeInTheDocument();
    });

    it("should not show an alert when select to search the agreement selection", () => {
      const { getByText, queryByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      getByText(/Je connais ma convention collective/).click();

      expect(queryByText(/À noter/)).not.toBeInTheDocument();
    });

    it("should not show an alert when select i don't know my agreement", () => {
      const { getByText, queryByText } = render(
        <EmbeddedInjectedForm Step={RouteSelection} />
      );
      getByText(/Je ne connais pas ma convention collective/).click();

      expect(queryByText(/À noter/)).not.toBeInTheDocument();
    });
  });

  describe("with data in form (come back on the step)", () => {
    it("should show an alert when skip the agreement selection selected", () => {
      const { getByText, getByRole } = render(
        <EmbeddedInjectedForm
          Step={RouteSelection}
          formData={{ ccn: { route: "not-selected" } }}
        />
      );

      expect(
        getByRole("radio", {
          checked: true,
          name: /Je ne souhaite pas renseigner ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByText(
          /Vous pouvez passer cette étape et poursuivre la simulation pour connaitre la durée prévue par le code du travail/
        )
      ).toBeInTheDocument();
    });
  });

  it("should not show an alert when search the agreement selected", () => {
    const { queryByText, getByRole } = render(
      <EmbeddedInjectedForm
        Step={RouteSelection}
        formData={{ ccn: { route: "agreement" } }}
      />
    );

    expect(
      getByRole("radio", {
        checked: true,
        name: /Je connais ma convention collective/,
      })
    ).toBeInTheDocument();
    expect(queryByText(/À noter/)).not.toBeInTheDocument();
  });
});
