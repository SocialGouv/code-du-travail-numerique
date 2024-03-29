import { Paragraph, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import { CallToActionTile } from "./CallToAction";
import styled from "styled-components";

type Props = {
  description: React.ReactNode | null;
  link: string;
  title: string;
  image: string;
};
export default function CallToActionWidget({
  description,
  link,
  title,
  image,
}: Props): JSX.Element {
  return (
    <CallToActionTile
      action="Installer"
      title={title}
      titleTagType="h2"
      href={link}
    >
      <>
        <Image src={`/static/assets/img/${image}`} alt={"Widget " + title} />
        <ParagraphNarrow>{description}</ParagraphNarrow>
      </>
    </CallToActionTile>
  );
}

const Image = styled.img`
  margin: ${theme.spacings.small} auto;
  height: auto;
  width: auto;
  max-width: 90%;
  border: solid 1px ${theme.colors.border};
`;

const ParagraphNarrow = styled(Paragraph)`
  @media (min-width: ${theme.breakpoints.desktop}) {
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
  }
`;
