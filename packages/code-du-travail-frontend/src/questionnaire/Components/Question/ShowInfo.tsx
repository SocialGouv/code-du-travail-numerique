import styled from "styled-components";
import { Button, Section, icons } from "@socialgouv/cdtn-ui";
import { trackClickViewPageInfo } from "../../tracking";
import { useRouter } from "next/router";
import { DossierLicenciementContext, useStore } from "../../store";
import { useContext } from "react";
import {SITE_URL} from "../../../config";
const { DirectionRight } = icons;

export const ShowInfo = ({
  slug,
  widgetMode,
}: {
  slug: string;
  widgetMode: boolean;
}) => {
  const router = useRouter();
  const store = useContext(DossierLicenciementContext);
  const setQuestionnaireSlug = useStore(
    store,
    (state) => state.setQuestionnaireSlug
  );
  return (
    <ButtonSection>
      <Button
        variant="primary"
        onClick={() => {
          setQuestionnaireSlug(slug);
          trackClickViewPageInfo();
          const destination = `/information/${slug}`;
          if (widgetMode) {
            window.open(`${SITE_URL}${destination}`);
            return;
          }
          router.push(destination);
        }}
      >
        Afficher les informations personnalisées
        <ArrowWrapper>
          <DirectionRight />
        </ArrowWrapper>
      </Button>
    </ButtonSection>
  );
};

const ButtonSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowWrapper = styled.div`
  width: 28px;
  height: 15px;
  margin-left: 13px;
`;
