import { fr } from "@codegouvfr/react-dsfr";
import { CallOut } from "@codegouvfr/react-dsfr/CallOut";
import { css } from "@styled-system/css";

type StatsProps = {
  title: string;
  metric: number;
};

export const StatsDisplay = (props: StatsProps) => (
  <CallOut className={`${callOut}`}>
    <span className={`${metric} ${fr.cx("fr-mt-4v", "fr-m-0", "fr-h2")}`}>
      {props.metric.toLocaleString("fr").split(/\s/).join("\u00a0")}
    </span>
    <span className={fr.cx("fr-hidden-lg")}> </span>
    <span
      className={`${title} ${fr.cx("fr-text--bold", "fr-mt-4v", "fr-mb-0", "fr-h5")}`}
    >
      {props.title}
    </span>
  </CallOut>
);

const metric = css({
  lg: { textAlign: "right", display: "block" },
  textAlign: "left",
});

const title = css({
  lg: {
    textAlign: "right",
    marginStart: 0,
  },
  marginStart: "1em",
});

const callOut = css({
  height: "100%",
});
