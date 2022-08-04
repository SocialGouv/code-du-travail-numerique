import Disclaimer from "../../../../common/Disclaimer";

type Props = {
  hasSelectedAgreement: boolean;
  isAgreementSupported: boolean;
};

export default function AgreementInfo(props: Props) {
  return (
    <Disclaimer title={"Attention il peut exister un montant plus favorable"}>
      {props.hasSelectedAgreement && props.isAgreementSupported && (
        <p>
          Un accord d’entreprise, le contrat de travail ou un usage peut prévoir
          un montant plus favorable pour le salarié. Dans ce cas, c’est ce
          montant plus favorable qui s’applique au salarié.
        </p>
      )}
      {(!props.hasSelectedAgreement || !props.isAgreementSupported) && (
        <p>
          Une convention collective, un accord d’entreprise, le contrat de
          travail ou un usage peuvent prévoir un montant plus favorable pour le
          salarié. Dans ce cas, c’est ce montant plus favorable qui s’applique
          au salarié.
        </p>
      )}
    </Disclaimer>
  );
}
