import { render, waitFor } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { Salaires } from "../Salaires";

describe("<Salaires />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ salaires: [{ salaire: 3000 }] }}
        onSubmit={onSubmit}
        render={() => <Salaires name="salaires" />}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it("should delete a salaires", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{ salaires: [{ salaire: 3000 }] }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <Salaires name="salaires" />}
      />,
    );
    const deleteButton = getByText(/supprimer/i);
    deleteButton.click();
    expect(container).toMatchSnapshot();
  });
  it("should add a salaire", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <Salaires name="salaires" />}
      />,
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    await waitFor(() => getByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
