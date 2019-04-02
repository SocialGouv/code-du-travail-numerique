---
name: Categories
menu: Component
---
import "@cdt/css";
import { Playground, Props } from "docz";
import Category from "../Category";
import Categories from ".";

## \<Categories/\>

<Playground>
  <Categories>
    <Category
      icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/handshake.svg"
      title="Embauche et contrat"
    />
    <Category
      icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/time.svg"
      title="Durée de travail et congés"
    />
    <Category
      icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/coins.svg"
      title="Rémunération"
    />
    <Category
      icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/shield.svg"
      title="Santé et sécurité"
    />
  </Categories>
</Playground>

<Props of={Category} />
