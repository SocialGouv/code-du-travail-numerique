import React from "react";
import { render, wait } from "@testing-library/react";
import { AbsencePeriods } from "../AbsencePeriods";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

describe("<AbsencePeriods />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ absences: [{ type: "Grève", duration: 3 }] }}
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
        initialValues={{ absences: [{ type: "Grève", duration: 3 }] }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <AbsencePeriods name="absences" />}
      />
    );
    const [deleteButton] = getAllByText(/supprimer/i);
    deleteButton.click();
    await wait(() => {});
    expect(container).toMatchSnapshot();
  });
  it("should add a period", async () => {
    const onSubmit = jest.fn();
    const { container, getByText, getAllByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <AbsencePeriods name="absences" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();

    await wait(() => getAllByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
