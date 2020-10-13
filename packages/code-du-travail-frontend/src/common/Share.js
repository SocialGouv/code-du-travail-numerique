import { Dropdown, icons, theme, utils } from "@socialgouv/cdtn-ui/";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const { copyToClipboard } = utils;

export const Share = () => {
  const [currentPageUrl, setCurrentPageUrl] = useState(undefined);
  const hiddenInputRef = useRef(null);
  const [isUrlCopied, setUrlCopied] = useState(false);

  useEffect(() => {
    setCurrentPageUrl(window.location.href);
  }, [setCurrentPageUrl]);

  return (
    <Flex>
      <StyledButton
        spacing="left"
        type="button"
        className="no-after"
        title="Partager sur Facebook"
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentPageUrl
            )}`,
            "facebook_popup",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
          )
        }
      >
        <Circle>
          <StyledIcon as={icons.ShareFacebook} />
        </Circle>
      </StyledButton>
      <StyledLink
        href={`mailto:?body=${currentPageUrl}`}
        spacing="left"
        title="Envoyer par email"
      >
        <Circle>
          <StyledIcon as={icons.Mail} />
        </Circle>
      </StyledLink>
      <StyledButton
        spacing="left"
        title="Partager sur LinkedIn"
        onClick={() =>
          window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              currentPageUrl
            )}`,
            "linkedin_popup",
            "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
          )
        }
      >
        <Circle>
          <StyledIcon as={icons.ShareLinkedin} />
        </Circle>
      </StyledButton>
      <Dropdown
        opener={(showDropdown) => (
          <StyledButton
            spacing="left"
            title="Plus d’options"
            onClick={async () => {
              setUrlCopied(false);
              if (window.navigator.share) {
                try {
                  await window.navigator.share({ url: currentPageUrl });
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
          spacing="top"
          title="Partager sur Twitter"
          onClick={() =>
            window.open(
              `https://twitter.com/intent/tweet/?url=${encodeURIComponent(
                currentPageUrl
              )}`,
              "twitter_popup",
              "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
            )
          }
        >
          <Circle>
            <StyledIcon as={icons.ShareTwitter} />
          </Circle>
          <ActionLabel>Partager sur Twitter</ActionLabel>
        </StyledButton>
        <StyledButton
          spacing="top"
          title="Copier le lien"
          onClick={() => {
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
            aria-labelledby={isUrlCopied ? "Lien copié !" : "Copier le lien"}
          >
            {isUrlCopied ? "Lien copié !" : "Copier le lien"}
          </ActionLabel>
        </StyledButton>
        <HiddenInput tabIndex="-1" ref={hiddenInputRef} />
        <StyledLink
          spacing="top"
          title="Envoyer par Whatsapp"
          href={`https://wa.me/?text=${encodeURIComponent(currentPageUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="no-after"
        >
          <Circle>
            <StyledIcon as={icons.ShareWhatsapp} />
          </Circle>
          <ActionLabel>Envoyer par Whatsapp</ActionLabel>
        </StyledLink>
      </Dropdown>
    </Flex>
  );
};

const { fonts, spacings } = theme;

const Flex = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
`;

const commonActionStyles = css`
  display: flex;
  align-items: center;
  padding: 0;
  ${({ spacing }) => {
    if (spacing === "left") return `margin-left: ${spacings.small};`;
    if (spacing === "top") return `margin-top: ${spacings.small};`;
  }};
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
`;

const StyledButton = styled.button`
  ${commonActionStyles};
`;

const StyledLink = styled.a`
  ${commonActionStyles};
  text-decoration: none;
`;

const Circle = styled.div`
  flex: 0 0 auto;
  padding: ${spacings.xsmall};
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
`;

const StyledIcon = styled.div`
  display: block;
  width: 2rem;
  height: 2rem;
`;

const Center = styled.div`
  text-align: center;
`;

const ActionLabel = styled.div`
  margin: 0 ${spacings.small};
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
