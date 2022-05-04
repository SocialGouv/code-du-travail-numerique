import { Paragraph, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import Link from "next/link";
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
    <Link href={link} passHref>
      <CallToActionTile
        noCustom
        action="Installer"
        title={title}
        titleTagType="h2"
      >
        <>
          <Image src={`/static/assets/img/${image}`} alt={"Widget " + title} />
          <ParagraphNarrow>{description}</ParagraphNarrow>
        </>
      </CallToActionTile>
    </Link>
  );
}

const Image = styled.img`
  margin: auto;
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
