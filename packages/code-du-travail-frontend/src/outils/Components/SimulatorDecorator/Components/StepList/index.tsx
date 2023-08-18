import { FlatList, theme, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export type StepListProps = {
  activeIndex: number;
  steps: {
    name: string;
    label: string;
  }[];
  width: string;
  listRef?: React.Ref<HTMLLIElement>;
  className?: string;
};

const StepList = ({
  activeIndex,
  steps,
  width,
  listRef,
  className,
}: StepListProps): JSX.Element => {
  return (
    <StyledWrapper variant="dark" defaultWidth={width} className={className}>
      <Title>
        Étape<HideOnMobile>s</HideOnMobile>
        <StepProgress>
          &nbsp;{`${activeIndex + 1}/${steps.length}`}
        </StepProgress>
      </Title>
      <FlatList as="ol">
        {steps.map((item, index) => (
          <StyledListItem
            key={item.name}
            index={index}
            isActive={activeIndex === index}
            ref={activeIndex === index ? listRef : undefined}
            tabIndex={activeIndex === index ? "-1" : undefined}
            aria-live={activeIndex === index ? "polite" : undefined}
            title={activeIndex === index ? "onglet actif" : null}
          >
            <IndexCircle isActive={activeIndex === index}>
              {index + 1}
            </IndexCircle>
            {item.label}
          </StyledListItem>
        ))}
      </FlatList>
    </StyledWrapper>
  );
};

export default StepList;

const { box, spacings, breakpoints } = theme;

const StyledWrapper = styled(Wrapper)<{ defaultWidth: string }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: ${({ defaultWidth }) => defaultWidth};
  /*  prettier-ignore  */
  padding: ${spacings.larger} ${spacings.larger} ${spacings.larger} ${spacings.larger};
  border-radius: ${box.borderRadius} 0 0 ${box.borderRadius};
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: ${spacings.base} ${spacings.small};
    border-radius: ${box.borderRadius};
  }
  @media print {
    display: none;
  }
`;

const Title = styled.span.attrs({
  role: "heading",
})`
  margin: ${spacings.medium} 0;
  font-weight: 600;
  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }
`;
const HideOnMobile = styled.span`
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const StepProgress = styled.span`
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: inline-block;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  color: ${({ isActive, theme }) =>
    isActive ? theme.altText : theme.placeholder};
  font-weight: 600;
  line-height: 1;
  text-align: left;
  text-decoration: none;
  & + & {
    margin-top: ${spacings.base};
  }
  outline: none; /* StepListItem may receive focus in order to improve accessibility */
  @media (max-width: ${breakpoints.tablet}) {
    display: ${({ isActive }) => (isActive ? "flex" : "none")};
    & + & {
      margin-top: 0;
    }
  }
`;

const IndexCircle = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  margin: ${spacings.tiny} ${spacings.small};
  margin-left: 0;
  color: ${({ isActive, theme }) =>
    isActive ? theme.white : theme.placeholder};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.secondary : theme.bgTertiary};
  border-radius: 49%;
`;
