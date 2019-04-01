import React from "react";
import { render } from "react-testing-library";
import Article from ".";

const articleProps = {
  title:
    "Contrat de travail et formalités d'embauche de l'assistante maternelle",
  sourceType: "Fiche service public",
  date: "26/07/2018"
};

describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(
      <Article
        {...articleProps}
        onValidate={jest.fn()}
        onInvalidate={jest.fn()}
      >
        this is an Article
      </Article>
    );
    expect(container).toMatchSnapshot();
  });
  // will be uncomment in next PR
  // test("call validate handler", () => {
  //   const handler = jest.fn();
  //   const { getByTitle } = render(
  //     <Article {...articleProps} onValidate={handler} onInvalidate={jest.fn()}>
  //       this is an Article
  //     </Article>
  //   );
  //   const button = getByTitle(/Valider cette réponse/i);
  //   button.click();
  //   expect(handler).toHaveBeenCalled();
  // });
  // test("call invalidate handler", () => {
  //   const handler = jest.fn();
  //   const { getByTitle } = render(
  //     <Article {...articleProps} onValidate={jest.fn()} onInvalidate={handler}>
  //       this is an Article
  //     </Article>
  //   );
  //   const button = getByTitle(/Invalider cette réponse/i);
  //   button.click();
  //   expect(handler).toHaveBeenCalled();
  // });
});
