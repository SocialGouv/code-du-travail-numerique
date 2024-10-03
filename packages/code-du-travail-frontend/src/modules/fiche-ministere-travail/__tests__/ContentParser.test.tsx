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
});
