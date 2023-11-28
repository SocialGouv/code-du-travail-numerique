import Link from "next/link";

type Props = {
  link: string;
  containerStyle?: React.CSSProperties;
};

export function AgreementsNotes(props: Props) {
  return (
    <div style={props.containerStyle}>
      <strong>
        Pour savoir si la mesure prévue par la convention collective s’applique
        à votre situation, reportez-vous{" "}
        <Link href={props.link}>à la réponse complète à cette question</Link>.
      </strong>
    </div>
  );
}
