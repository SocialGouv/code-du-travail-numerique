import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import { SOURCES, getRouteBySource } from "@cdt/sources";
import { Container, Section, CardList, Tile } from "@socialgouv/react-ui";

import ConventionModal from "../conventions/Search/Modal";

function Tools({ tools = [] }) {
  return (
    <Section variant="white">
      <Container>
        <CardList
          title="Boîte à outils"
          desc="Trouvez des réponses personnalisées selon votre situation"
          href="/outils"
        >
          {tools
            .map(({ title, slug }) => (
              <Link
                href={`/${getRouteBySource(SOURCES.TOOLS)}/[slug]`}
                as={`/${getRouteBySource(SOURCES.TOOLS)}/${slug}`}
                passHref
                key={slug}
              >
                <Tile button={"Démarrer"}>{title}</Tile>
              </Link>
            ))
            .concat([
              <ConventionModal key="convention-modal" />,
              <Link
                key="letters"
                href={`/${getRouteBySource(SOURCES.LETTERS)}`}
                as={`/${getRouteBySource(SOURCES.LETTERS)}`}
                passHref
              >
                <Tile button={"Consulter"}>{"Modèles de courriers"}</Tile>
              </Link>,
              <Tile key="next-tools">
                Bientôt d’autres outils disponibles...
              </Tile>
            ])}
        </CardList>
      </Container>
    </Section>
  );
}

Tools.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  )
};

export default React.memo(Tools);
