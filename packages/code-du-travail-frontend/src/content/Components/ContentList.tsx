import { icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import { ListLink } from "../../search/SearchResults/Results";

export const ContentList = ({ block, key }) => {
  const { contents } = block;
  return (
    <>
      <ContentItemList>
        {contents?.map((item, ContentIndex) => (
          <ListLink
            item={{
              ...item,
              icon: icons[item?.icon],
            }}
            key={`${key}-${ContentIndex}`}
            disableAnalytics
          ></ListLink>
        ))}
      </ContentItemList>
    </>
  );
};
const { breakpoints } = theme;

const ContentItemList = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    & > div {
      margin-bottom: 12px;
    }
  }
  @media (min-width: ${breakpoints.mobile}) {
    margin-bottom: 12px;

    display: flex;
    flex-wrap: wrap;

    & > div {
      min-height: 341px;
      margin: 12px;
      flex-basis: 40%;
      max-width: 45%;
    }
  }

  p,
  a,
  button {
    width: 100%;
    text-align: center;
  }
`;
