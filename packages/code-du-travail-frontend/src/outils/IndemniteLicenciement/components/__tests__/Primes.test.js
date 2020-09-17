import { render, waitFor } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { Primes } from "../Primes";

describe("<Primes />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{ primes: [{ prime: 300 }] }}
        onSubmit={onSubmit}
        render={() => <Primes name="primes" />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should delete a prime", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{ primes: [{ prime: 300 }] }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <Primes name="primes" />}
      />
    );
    const deleteButton = getByText(/supprimer/i);
    deleteButton.click();
    expect(container).toMatchSnapshot();
  });
  it("should add a prime", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <Primes name="primes" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    await waitFor(() => getByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
