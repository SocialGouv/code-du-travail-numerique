import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import type { NewsImage as NewsImageType } from "../type";

type Props = {
  image: NewsImageType & { url: string };
  // Dans la liste, l'image n'est pas l'élément principal de la page.
  lazy?: boolean;
  className?: string;
};

const URL_PATTERN = /^https?:\/\//;

const Author = ({ author }: { author: string }) =>
  URL_PATTERN.test(author) ? (
    <a href={author} target="_blank" rel="noopener noreferrer">
      {author}
    </a>
  ) : (
    <>{author}</>
  );

const Caption = ({ image }: Pick<Props, "image">) => {
  if (image.license === "source") {
    return (
      <>Source : {image.author ? <Author author={image.author} /> : null}</>
    );
  }
  return (
    <>
      Image libre de droit
      {image.author ? (
        <>
          {" "}
          – <Author author={image.author} />
        </>
      ) : null}
    </>
  );
};

export const NewsImage = ({ image, lazy = false, className }: Props) => (
  <figure className={className ?? fr.cx("fr-content-media", "fr-mb-6w")}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      className={fr.cx("fr-responsive-img")}
      src={image.url}
      alt={image.alt}
      width={image.width}
      height={image.height}
      {...(lazy ? { loading: "lazy" } : { fetchPriority: "high" })}
    />
    <figcaption className={fr.cx("fr-content-media__caption")}>
      {/* La légende DSFR est en colonne flex : un seul enfant garde le crédit sur une ligne. */}
      <span>
        <Caption image={image} />
      </span>
    </figcaption>
  </figure>
);
