import { render } from "@testing-library/react";
import { ContentParser } from "../ContentParser";

describe("Fiche MT content parser", () => {
  test("should replace youtube video with a link", () => {
    const contentWithYoutubeVideo = `<div class="paragraph paragraph--type--insert-video paragraph--view-mode--default"> <div class="fr-content-media youtube_player" data-src="https://www.youtube.com/embed/lSYAHnf9F1Q?t&amp;start=0" data-title="Le travail illégal ; la répression | web série droit du travail"></div> </div><section data-component-id="dsfr4drupal:accordion" class="fr-accordion"> <h3 class="fr-accordion__title"> <button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-772381283" type="button"> Lire la retranscription textuelle </button> </h3> <div class="fr-collapse" id="accordion-772381283"> <p>Le travail illégal génère de la précarité et est à l’origine d’un préjudice important pour les finances publiques. </p></div> </section><section class="fr-mb-4w fr-mt-6w fr-mb-6v ondine-container-color"> <p><a href="https://travail-emploi.gouv.fr/une-web-serie-sur-le-droit-du-travail" data-entity-type="node" data-entity-uuid="59115b98-c660-450c-a16c-ea5f978064fd" data-entity-substitution="canonical" title="Une web série sur le droit du travail" target="_blank" rel="nofollow, noopener"><strong>En savoir plus sur la web série droit du travail </strong></a></p> </section>`;
    const { getByText } = render(
      <ContentParser>{contentWithYoutubeVideo}</ContentParser>
    );

    expect(getByText("Cliquez ici pour voir la vidéo")).toBeInTheDocument();
  });

  test("should replace callout with icon by a default one to avoid icon issue", () => {
    const contentWithDefaultCallOut = `<div class="fr-callout fr-icon-anyone"><div class="text-align-left"><a href="/sites/travail-emploi/files/files-spip/pdf/pst4.pdf" type="application/pdf" class="file file--mime-application-pdf file--application-pdf fr-link--download fr-link" data-tracking-download-label="4e Plan santé au travail (PST)" download="" data-component-id="dsfr4drupal:link">    4e Plan santé au travail (PST) <span class="fr-link__detail">PDF - 3.97 Mo</span></a></div></div>`;
    const { container } = render(
      <ContentParser>{contentWithDefaultCallOut}</ContentParser>
    );

    const calloutDiv = container.querySelector(".fr-callout");
    expect(calloutDiv).toBeInTheDocument();
    expect(calloutDiv).toHaveClass("fr-icon-information-line");
    expect(calloutDiv).toHaveTextContent(
      "4e Plan santé au travail (PST) PDF - 3.97 Mo"
    );
  });

  test("should not replace callout without icon", () => {
    const contentWithDefaultCallOut = `<div class="fr-callout"><div class="text-align-left"><a href="/sites/travail-emploi/files/files-spip/pdf/pst4.pdf" type="application/pdf" class="file file--mime-application-pdf file--application-pdf fr-link--download fr-link" data-tracking-download-label="4e Plan santé au travail (PST)" download="" data-component-id="dsfr4drupal:link">    4e Plan santé au travail (PST) <span class="fr-link__detail">PDF - 3.97 Mo</span></a></div></div>`;
    const { container } = render(
      <ContentParser>{contentWithDefaultCallOut}</ContentParser>
    );

    const calloutDiv = container.querySelector(".fr-callout");
    expect(calloutDiv).toBeInTheDocument();
    expect(calloutDiv).not.toHaveClass("fr-icon-information-line");
    expect(calloutDiv).toHaveTextContent(
      "4e Plan santé au travail (PST) PDF - 3.97 Mo"
    );
  });

  test("Should keep accordion Button", () => {
    const src =
      '<button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    const { container } = render(<ContentParser>{src}</ContentParser>);
    expect(container.innerHTML).toBe(src);
  });

  test("Should keep accordion Button but remove js injection", () => {
    const src =
      '<button class="fr-accordion__btn" onClick="() => { alert("xss"); }" onBlur="() => { alert("xss"); }" onmouseover="() => { alert("xss"); }" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>';
    const { container } = render(<ContentParser>{src}</ContentParser>);
    expect(container.innerHTML).toBe(
      `<button class="fr-accordion__btn" aria-expanded="false" aria-controls="accordion-467706029" type="button" data-fr-js-collapse-button="true"> Retranscription textuelle </button>`
    );
  });

  test("Should remove time", () => {
    const src =
      '<p class="fr-card__detail">Date de mise à jour le <time datetime="2024-10-09T12:00:00Z">9 octobre 2024</time></p>';
    const { container } = render(<ContentParser>{src}</ContentParser>);
    expect(container.innerHTML).toBe(
      `<p class="fr-card__detail">Date de mise à jour le 9 octobre 2024</p>`
    );
  });

  test("Should work with strong + link inside p", () => {
    const src = `<p>La qualification de «&nbsp;démission&nbsp;» est réservée à la rupture, à l’initiative du salarié, de son contrat de travail à durée indéterminée. <strong>Les salariés en CDD peuvent mettre fin par anticipation, à leur contrat de travail dans certaines situations</strong> <a href="/le-contrat-duree-determinee-cdd" data-entity-type="node" data-entity-uuid="d223707a-504b-4740-8a97-618ce94b1175" data-entity-substitution="canonical" title="Le contrat à durée déterminée (CDD)">limitativement énumérées</a>.</p>`;
    const { container } = render(<ContentParser>{src}</ContentParser>);
    expect(container.innerHTML).toBe(
      `<p>La qualification de «&nbsp;démission&nbsp;» est réservée à la rupture, à l’initiative du salarié, de son contrat de travail à durée indéterminée. <strong>Les salariés en CDD peuvent mettre fin par anticipation, à leur contrat de travail dans certaines situations</strong> <a href=\"/le-contrat-duree-determinee-cdd\" title=\"Le contrat à durée déterminée (CDD)\">limitativement énumérées</a>.</p>`
    );
  });

  test("Should work with ul", () => {
    const src = `<ul><li><span><strong>À</strong></span><strong> sa demande et après acceptation de l'employeur</strong> (un écrit est conseillé). Dans ce cas, l'indemnité de préavis n'est pas due&nbsp;;</li><li><span><strong>À</strong> </span><strong>la seule initiative de l’employeu</strong>r. Celui-ci doit néanmoins verser l’indemnité de préavis.</li></ul>`;
    const { container } = render(<ContentParser>{src}</ContentParser>);
    expect(container.innerHTML).toBe(
      `<ul><li><span><strong>À</strong></span><strong> sa demande et après acceptation de l'employeur</strong> (un écrit est conseillé). Dans ce cas, l'indemnité de préavis n'est pas due&nbsp;;</li><li><span><strong>À</strong> </span><strong>la seule initiative de l’employeu</strong>r. Celui-ci doit néanmoins verser l’indemnité de préavis.</li></ul>`
    );
  });
});
