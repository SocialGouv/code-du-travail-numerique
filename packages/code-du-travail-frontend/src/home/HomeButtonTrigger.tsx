import React from "react";
import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import styled from "styled-components";

type Props = {
  name: string;
  link: string;
  onClick?: () => void;
};

export const HomeButtonTrigger = (props: Props) => {
  return (
    <ButtonWrapper>
      <Link href={props.link} passHref legacyBehavior>
        <Button variant="primary" as="a" onClick={props.onClick}>
          {props.name} <StyledArrowRight />
        </Button>
      </Link>
    </ButtonWrapper>
  );
};

const { spacings } = theme;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const StyledArrowRight = styled(icons.DirectionRight)`
  width: 2.8rem;
  height: 1.5rem;
  margin-left: ${spacings.base};
`;
