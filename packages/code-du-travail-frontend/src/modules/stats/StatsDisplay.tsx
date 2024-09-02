import { fr } from "@codegouvfr/react-dsfr";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { css } from "../../../styled-system/css";

type StatsProps = {
  title: string;
  metric: number;
};

export const StatsDisplay = (props: StatsProps) => (
  <div className={fr.cx("fr-col-12", "fr-col-md-3")}>
    <CallOut className={`${callOut}`}>
      <span className={`${metric} ${fr.cx("fr-mt-4v", "fr-display--xs")}`}>
        {props.metric}
      </span>
      <span className={`${title} ${fr.cx("fr-text--bold", "fr-text--xl")}`}>
        {props.title}
      </span>
    </CallOut>
  </div>
);

const metric = css({
  textAlign: "right",
  display: "block",
});

const title = css({
  textAlign: "left",
});

const callOut = css({
  height: "100%",
});
