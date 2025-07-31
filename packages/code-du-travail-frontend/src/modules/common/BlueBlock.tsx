import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { css } from "@styled-system/css";
import { ReactNode } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  children: ReactNode;
  id: string;
  title: string;
  titleLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  picto: string | StaticImport;
  className?: string;
  noBackground?: boolean;
};

export const BlueBlock = ({
  children,
  title,
  titleLevel,
  picto,
  className = "",
  noBackground = false,
}: Props) => {
  const Title = titleLevel;

  return (
    <div
      className={`${fr.cx("fr-px-md-3w", "fr-px-1w", "fr-pt-4w", "fr-pb-11v")} ${noBackground ? "" : block} ${className}`}
    >
      <div className={"fr-grid-row"}>
        <Image
          priority
          src={picto}
          alt=""
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <Title className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
          {title}
        </Title>
      </div>
      <div>{children}</div>
    </div>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
