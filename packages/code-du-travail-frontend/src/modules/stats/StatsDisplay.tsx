import { fr } from "@codegouvfr/react-dsfr";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { css } from "../../../styled-system/css";

type StatsProps = {
  title: string;
  metric: number;
};

export const StatsDisplay = (props: StatsProps) => (
  <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
    <div className={`${fr.cx("fr-callout")} ${callOut}`}>
      <p className={`${metric} ${fr.cx("fr-mt-4v", "fr-display--xs")}`}>
        {props.metric}
      </p>
      <p className={`${title} ${fr.cx("fr-text--bold", "fr-text--xl")}`}>
        {props.title}
      </p>
    </div>
  </div>
);

const metric = css({
  textAlign: "right",
});

const title = css({
  textAlign: "left",
});

const callOut = css({
  height: "100%",
});
