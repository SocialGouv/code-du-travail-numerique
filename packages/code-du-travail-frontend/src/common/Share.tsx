import { Dropdown, icons, theme, utils } from "@socialgouv/cdtn-ui";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { matopush } from "../piwik";

const { copyToClipboard } = utils;

const POPUP_OPTIONS =
  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600";

type Props = {
  title: string;
  metaDescription: string;
};

export const Share = ({ title, metaDescription }: Props): JSX.Element => {
  const [currentPageUrl, setCurrentPageUrl] = useState("");
  const hiddenInputRef = useRef(null);
  const [isUrlCopied, setUrlCopied] = useState(false);

  useEffect(() => {
    setCurrentPageUrl(window.location.href);
  }, [setCurrentPageUrl]);

  return (
    <Flex>
      <StyledButton
        type="button"
        className="no-after spacing-left"
        title="Partager sur Facebook"
        onClick={() => {
          matopush(["trackEvent", "clic_share", currentPageUrl, "facebook"]);
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentPageUrl
            )}&quote=${encodeURIComponent(title)}`,
            "facebook_popup",
            POPUP_OPTIONS
          );
        }}
      >
        <Circle>
          <StyledIcon as={icons.ShareFacebook} />
        </Circle>
      </StyledButton>
      <StyledLink
        href={`mailto:?subject=${encodeURIComponent(
          `A lire sur le code du travail numérique : ${title}`
        )}&body=${`${encodeURIComponent(
          `${metaDescription}\n\n${currentPageUrl}`
        )}`}`}
        className="spacing-left"
        title="Envoyer par email"
        onClick={() => {
          matopush(["trackEvent", "clic_share", currentPageUrl, "email"]);
        }}
      >
        <Circle>
          <StyledIcon as={icons.Mail} />
        </Circle>
      </StyledLink>
      <StyledButton
        className="spacing-left"
        title="Partager sur LinkedIn"
        onClick={() => {
          matopush(["trackEvent", "clic_share", currentPageUrl, "linkedin"]);
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(
              title
            )}&url=${encodeURIComponent(currentPageUrl)}`,
            "linkedin_popup",
            POPUP_OPTIONS
          );
        }}
      >
        <Circle>
          <StyledIcon as={icons.ShareLinkedin} />
        </Circle>
      </StyledButton>
      <Dropdown
        opener={(showDropdown) => (
          <StyledButton
            className="spacing-left"
            title="Plus d’options"
            onClick={async () => {
              matopush([
                "trackEvent",
                "clic_share",
                currentPageUrl,
                "plus d’options",
              ]);
              setUrlCopied(false);
              if (window.navigator.share) {
                try {
                  await window.navigator.share({
                    text: `${title} : ${currentPageUrl}`,
                  });
                } catch (error) {
                  showDropdown();
                }
              } else {
                showDropdown();
              }
            }}
          >
            <Circle>
              <StyledIcon as={icons.Share} />
            </Circle>
          </StyledButton>
        )}
        labelledBy="Options de partage supplémentaires"
      >
        <Center>Plus d’options</Center>
        <StyledButton
          className="spacing-top"
          title="Partager sur Twitter"
          onClick={() => {
            matopush(["trackEvent", "clic_share", currentPageUrl, "twitter"]);
            window.open(
              `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
                `${title} : ${currentPageUrl}`
              )}`,
              "twitter_popup",
              POPUP_OPTIONS
            );
          }}
        >
          <Circle>
            <StyledIcon as={icons.ShareTwitter} />
          </Circle>
          <ActionLabel>Partager&nbsp;sur&nbsp;Twitter</ActionLabel>
        </StyledButton>
        <StyledButton
          className="spacing-top"
          title="Copier le lien"
          onClick={() => {
            matopush(["trackEvent", "clic_share", currentPageUrl, "copier"]);
            copyToClipboard({
              // if we don't provide the input, focusOut will
              // close the dropdown
              input: hiddenInputRef.current,
              text: currentPageUrl,
            });
            setUrlCopied(true);
          }}
        >
          <Circle>
            <StyledIcon as={icons.Link} />
          </Circle>
          <ActionLabel
            aria-live={isUrlCopied ? "off" : "assertive"}
            aria-labelledby={
              isUrlCopied ? "Lien copié !" : "Copier&nbsp;le&nbsp;lien"
            }
          >
            {isUrlCopied ? "Lien copié !" : "Copier le lien"}
          </ActionLabel>
        </StyledButton>
        <HiddenInput tabIndex="-1" ref={hiddenInputRef} />
        <StyledButton
          className="spacing-top"
          title="Envoyer par Whatsapp"
          onClick={() => {
            matopush(["trackEvent", "clic_share", currentPageUrl, "whatsapp"]);
            window.open(
              `https://wa.me/?text=${encodeURIComponent(
                `${title} : ${currentPageUrl}`
              )}`,
              "whatsapp_popup",
              POPUP_OPTIONS
            );
          }}
        >
          <Circle>
            <StyledIcon as={icons.ShareWhatsapp} />
          </Circle>
          <ActionLabel>Envoyer&nbsp;par&nbsp;Whatsapp</ActionLabel>
        </StyledButton>
      </Dropdown>
    </Flex>
  );
};

const { breakpoints, fonts, spacings } = theme;

const Flex = styled.div`
  display: flex;
  align-items: center;
  @media print {
    display: none;
  }
`;

const commonActionStyles = css`
  display: flex;
  align-items: center;
  padding: 0;
  color: ${({ theme }) => theme.secondary};
  font-weight: bold;
  font-size: ${fonts.sizes.default};
  text-align: left;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s linear;

  :hover,
  :focus {
    color: ${({ theme }) => theme.primary};
  }

  &.spacing-left {
    margin-left: ${spacings.small};
  }

  &.spacing-top {
    margin-top: ${spacings.small};
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.small};
  }
`;

const StyledButton = styled.button`
  ${commonActionStyles};
`;

const StyledLink = styled.a`
  ${commonActionStyles};
  text-decoration: none;
`;

const Circle = styled.span`
  flex: 0 0 auto;
  padding: ${spacings.xsmall};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
`;

const StyledIcon = styled.span`
  display: block;
  width: 2rem;
  height: 2rem;
`;

const Center = styled.span.attrs({
  "aria-level": "2",
  role: "heading",
})`
  text-align: center;
`;

const ActionLabel = styled.span`
  margin-left: ${spacings.small};
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: 0;
  padding: 0;
  border: 0;
  opacity: 0;
`;
