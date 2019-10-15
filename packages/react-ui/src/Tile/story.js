import React from "react";
import { List } from "react-feather";

import { Section } from "../layout/Section";
import { Tile } from ".";

export default {
  component: Tile,
  title: "Components|Tile"
};

export const base = () => (
  <div style={{ width: "400px" }}>
    <Section>
      <Tile href="#">Embauche et contrat</Tile>
    </Section>
    <Section>
      <Tile icon={List} href="#">
        Embauche et contrat avec une icone
      </Tile>
    </Section>
    <Section>
      <Tile href="#" button="click me">
        Embauche et contrat
      </Tile>
    </Section>
    <Section>
      <Tile button="click me">
        Celui-ci est un button parce qu&apos;il n&apos;a pas de href
      </Tile>
    </Section>
    <Section>
      <Tile style={{ height: "100px" }} href="#">
        Que se passe-t-il lorsque la tile est trop petite par rapport au contenu
        ? Un titre un peu plus long ici pour voir ce que ça donne de faire
        n&apos;importe quoi avec un titre. Un peu comme lorsque l&apos;on a de
        supers longues questions dans certains contenus. Un titre un peu plus
        long ici pour voir ce que ça donne de faire n&apos;importe quoi avec un
        titre. Un peu comme lorsque l&apos;on a de supers longues questions dans
        certains contenus
      </Tile>
    </Section>
    <Section>
      <Tile button="ok ok" style={{ height: "400px" }} href="#">
        Que se passe-t-il lorsque la tile est trop grande par rapport au contenu
        ?
      </Tile>
    </Section>
  </div>
);
