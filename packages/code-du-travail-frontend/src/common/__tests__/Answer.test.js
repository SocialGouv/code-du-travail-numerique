import React from "react";
import { render } from "@testing-library/react";
import { icons } from "@cdt/ui-old/";

import Answer from "../Answer";

describe("<Answer />", () => {
  it("should render", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        icon={icons.Question}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("should render a breadcrumbs", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        icon={icons.Question}
        breadcrumbs={[
          { title: "tag1", slug: "tag-1" },
          { title: "tag2", slug: "tag-2" }
        ]}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("should render tooltip", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong> contenant des tooltip sur certains mot comme rescrit. match aussi les abbréviation comme APE mais pas ape ou ses variantes comme code ape</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        icon={icons.Question}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
  it("should render tooltip for words with diacritics without breaking html", () => {
    const { container } = render(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>indemnités</strong>comme code ape</p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
        icon={icons.Question}
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });
});
