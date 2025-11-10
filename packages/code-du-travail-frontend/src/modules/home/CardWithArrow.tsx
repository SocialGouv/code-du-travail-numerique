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
          <h4
            className={`${fr.cx("fr-mb-0", "fr-ml-2w", "fr-text--md", "fr-text--bold")} ${titleStyle}`}
          >
            {title}
          </h4>
        </div>
      </div>
      <div className={rightContainer}>
        <div className={rightArrow} />
      </div>
    </div>
  );
};

const wrapper = css({
  display: "flex",
  alignItems: "center",
  height: { base: "80px", md: "100px", lg: "120px" },
});

const cardContainer = css({
  height: "100%",
  flex: "1",
  minWidth: "0",
  overflow: "hidden",
  background: "var(--background-default-grey)",
  borderTopLeftRadius: "8px",
  borderBottomLeftRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
});

const titleStyle = css({
  color: "var(--text-action-high-blue-france)!",
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

const rightContainer = css({
  width: "30px",
  flexShrink: "0",
  height: "100%",
  filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.025))",
  transition: "all 0.3s ease",
});

const rightArrow = css({
  width: "100%",
  height: "100%",
  clipPath: "polygon(0% 0%, 0% 100%, 100% 50%)",
  background: "var(--background-default-grey)",
});
