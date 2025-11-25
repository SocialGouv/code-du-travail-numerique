import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";

type Props = {
  title: string;
  iconSrc: string;
};

export const CardWithArrow = ({ title, iconSrc }: Props) => {
  return (
    <div className={wrapper}>
      <div className={cardContainer}>
        <div className={`${fr.cx("fr-py-4w", "fr-px-2w")} ${cardHeader}`}>
          <div className={iconContainer}>
            <Image
              src={iconSrc}
              alt=""
              width={56}
              height={56}
              className={iconStyle}
            />
          </div>
          <h4 className={fr.cx("fr-mb-0", "fr-ml-2w", "fr-text--md")}>
            {title}
          </h4>
        </div>
      </div>
      <div className={arrowContainer}>
        <div className={arrow} />
      </div>
    </div>
  );
};

const wrapper = css({
  display: "flex",
  flexDirection: { base: "column", md: "row" },
  alignItems: { base: "center", md: "center" },
  height: { base: "auto", md: "88px" },
  width: "100%",
  filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))",
});

const cardContainer = css({
  height: { base: "88px", md: "100%" },
  width: { base: "100%", md: "auto" },
  flex: { base: "none", md: "1" },
  minWidth: "0",
  overflow: "hidden",
  background: "var(--background-default-grey)",
  borderRadius: { base: "8px", md: "0" },
  borderTopLeftRadius: { base: "8px", md: "8px" },
  borderBottomLeftRadius: { base: "8px", md: "8px" },
  transition: "all 0.3s ease",
});

const cardHeader = css({
  display: "flex",
  alignItems: "center",
  height: "100%",
});

const iconContainer = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

const iconStyle = css({
  width: { base: "40px", md: "48px", lg: "56px" },
  height: { base: "40px", md: "48px", lg: "56px" },
});

const arrowContainer = css({
  width: { base: "60px", md: "30px" },
  height: { base: "15px", md: "100%" },
  flexShrink: "0",
  transition: "all 0.3s ease",
});

const arrow = css({
  width: "100%",
  height: "100%",
  clipPath: {
    base: "polygon(0% 0%, 100% 0%, 50% 100%)",
    md: "polygon(0% 0%, 0% 100%, 100% 50%)",
  },
  background: "var(--background-default-grey)",
});
