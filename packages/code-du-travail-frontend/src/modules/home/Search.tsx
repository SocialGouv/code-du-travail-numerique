import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Image from "next/image";
import { HomeSearch, HomeSearchV2 } from "./Components";
import { useFeatureFlag } from "../utils/useFeatureFlag";
import { ABTesting, ABTestVariant } from "../config/initABTesting";

export const Search = () => {
  const variant = useFeatureFlag(ABTesting.SEARCH);

  return (
    <div className={mainContainer}>
      <div className={fr.cx("fr-container", "fr-py-6w")}>
        <div
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--middle"
          )}
        >
          <div className={fr.cx("fr-col-12", "fr-col-md-7")}>
            <h1 className={fr.cx("fr-mb-2w", "fr-text--lead", "fr-text--bold")}>
              Bienvenue sur{" "}
              <span
                className={`${fr.cx("fr-mt-2w", "fr-mb-0", "fr-h1")} ${displayBlock}`}
              >
                le Code du travail numérique
              </span>
            </h1>
            <h2 className={fr.cx("fr-text--lead", "fr-text--bold", "fr-mb-6w")}>
              Obtenez les réponses à vos questions sur le droit du travail.
            </h2>
            {variant === ABTestVariant.SEARCH_V2 ? (
              <HomeSearchV2 />
            ) : (
              <HomeSearch />
            )}
          </div>
          <div
            className={fr.cx(
              "fr-col-md-5",
              "fr-col-12",
              "fr-hidden",
              "fr-unhidden-md"
            )}
          >
            <Image
              src={"/static/assets/icons/home/illustration-principale.svg"}
              alt=""
              priority
              fill={false}
              width={486}
              height={331}
              sizes="(max-width: 768px) 378px, 486px"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mainContainer = css({
  bg: "var(--blue-cumulus-925-125)",
});

const displayBlock = css({
  display: "block",
});
