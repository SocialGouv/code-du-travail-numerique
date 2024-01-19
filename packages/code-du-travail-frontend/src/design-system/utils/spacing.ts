import { type FrCxArg, type SpacingToken } from "@codegouvfr/react-dsfr";

export type SpacingProps = {
  m?: SpacingToken | "auto";
  mb?: SpacingToken | "auto";
  ml?: SpacingToken | "auto";
  mr?: SpacingToken | "auto";
  mt?: SpacingToken | "auto";
  mx?: SpacingToken | "auto";
  my?: SpacingToken | "auto";
  p?: SpacingToken;
  pb?: SpacingToken;
  pl?: SpacingToken;
  pr?: SpacingToken;
  pt?: SpacingToken;
  px?: SpacingToken;
  py?: SpacingToken;
};

export const buildSpacingClasses = ({
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
}: SpacingProps): FrCxArg => [
  mt && `fr-mt-${mt}`,
  mb && `fr-mb-${mb}`,
  ml && `fr-ml-${ml}`,
  mr && `fr-mr-${mr}`,
  mx && `fr-mx-${mx}`,
  my && `fr-my-${my}`,
  pt && `fr-pt-${pt}`,
  pb && `fr-pb-${pb}`,
  pl && `fr-pl-${pl}`,
  pr && `fr-pr-${pr}`,
  px && `fr-px-${px}`,
  py && `fr-py-${py}`,
];

export type MarginProps = Omit<
  SpacingProps,
  "p" | "pb" | "pl" | "pr" | "pt" | "px" | "py"
>;
export type PaddingProps = Omit<
  SpacingProps,
  "m" | "mb" | "ml" | "mr" | "mt" | "mx" | "my"
>;
