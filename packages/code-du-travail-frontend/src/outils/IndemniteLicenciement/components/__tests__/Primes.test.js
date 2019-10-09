import React from "react";
import { render, wait } from "../../../../../test/utils";
import { Primes } from "../Primes";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

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
  it("should delete a primes", async () => {
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
    await wait(() => {});
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
    await wait(() => getByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
