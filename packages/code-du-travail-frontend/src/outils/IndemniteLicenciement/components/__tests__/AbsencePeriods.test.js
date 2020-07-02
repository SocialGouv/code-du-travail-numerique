import { render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { AbsencePeriods } from "../AbsencePeriods";

describe("<AbsencePeriods />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ absences: [{ duration: 3, type: "Grève" }] }}
        onSubmit={onSubmit}
        render={() => <AbsencePeriods name="absences" />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should delete a period", async () => {
    const onSubmit = jest.fn();
    const { container, getAllByText } = render(
      <Form
        initialValues={{
          absences: [
            { duration: 3, type: "Grève" },
            { duration: 3, type: "Grève" },
          ],
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <AbsencePeriods name="absences" />}
      />
    );
    const [deleteButton] = getAllByText(/supprimer/i);
    deleteButton.click();
    expect(container).toMatchSnapshot();
  });
  it("should add a period", async () => {
    const onSubmit = jest.fn();
    const { getByText, getAllByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ absences: [{ duration: 3, type: "Grève" }] }}
        onSubmit={onSubmit}
        render={() => <AbsencePeriods name="absences" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    expect(getAllByText(/supprimer/i).length).toBe(2);
  });
});
