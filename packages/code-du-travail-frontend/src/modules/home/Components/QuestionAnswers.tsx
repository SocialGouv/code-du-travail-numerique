import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { ReactNode } from "react";

export type QuestionAnswerItem = {
  icon: string;
  content: ReactNode;
};

type Props = {
  items: QuestionAnswerItem[];
};

export const QuestionAnswers = ({ items }: Props) => {
  return (
    <div>
      <h3 className={fr.cx("fr-text--lg")}>Les réponses à votre question</h3>
      <div className={itemsList}>
        {items.map((item, index) => (
          <div key={index} className={itemContainer}>
            <div className={`${iconWrapper} ${fr.cx("fr-mr-2w")}`}>
              <Image
                src={item.icon}
                alt=""
                width={56}
                height={56}
                className={imageStyle}
              />
            </div>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const imageStyle = css({
  maxWidth: "unset",
});
const itemsList = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

const itemContainer = css({
  display: "flex",
  alignItems: "center",
});

const iconWrapper = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
