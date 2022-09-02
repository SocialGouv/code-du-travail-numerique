import styled from "styled-components";
import { Button, Section, icons } from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
const { DirectionRight } = icons;

export const ShowInfo = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <ButtonSection>
      <Button
        variant="primary"
        onClick={() => router.push(`/information/${slug}`)}
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
