import React from "react";
import { withRouter } from "next/router";
import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";
import { Container, Section } from "@cdt/ui";
import ListeConventions from "../src/conventions/ListeConventions";
import { searchIdcc } from "../src/common/convention.service";

class Kali extends React.Component {
  static async getInitialProps() {
    const conventions = await searchIdcc("").then(hits =>
      hits.map(h => h._source)
    );
    return { conventions };
  }

  render() {
    const { conventions, pageUrl, ogImage } = this.props;

    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={"Liste des conventions collectives"}
          description={"Retrouvez la convention collective de votre branche"}
          image={ogImage}
        />
        <Section>
          <Container narrow>
            <ListeConventions initialConventions={conventions} />
          </Container>
        </Section>
      </PageLayout>
    );
  }
}

export default withRouter(Kali);
