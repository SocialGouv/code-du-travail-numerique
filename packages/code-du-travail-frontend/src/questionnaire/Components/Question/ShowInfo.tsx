import styled from "styled-components";
import { Button, Section, icons } from "@socialgouv/cdtn-ui";
import { trackClickViewPageInfo } from "../../tracking";
import { useRouter } from "next/router";
import { useStore } from "../../store";
const { DirectionRight } = icons;

export const ShowInfo = ({
  slug,
  widgetMode,
}: {
  slug: string;
  widgetMode: boolean;
}) => {
  const router = useRouter();
  const setQuestionnaireSlug = useStore((state) => state.setQuestionnaireSlug);
  return (
    <ButtonSection>
      <Button
        variant="primary"
        onClick={() => {
          setQuestionnaireSlug(slug);
          trackClickViewPageInfo();
          const destination = `/information/${slug}`;
          if (widgetMode) {
            window.open(`${window.location.origin}${destination}`);
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
