---
name: Support
menu: Component
---
import "@cdt/css";
import { Playground, Props } from "docz";
import Container from "../Container";
import Section from "../Section";
import Support from ".";

## \<Support/\>

<Playground>
  {() => {
    const someVar = "value";
    return (
      <React.Fragment>
        <Section>
          <Support
            onSubmit={event => {
              alert(`submit ${event.target.elements[0].value}`);
            }}
          >
            <input
              type="search"
              className="support__input"
              defaultValue="avignon"
            />
          </Support>
        </Section>
        <Section dark>
          <Support
            onSubmit={event => {
              alert(`submit ${event.target.value}`);
            }}
          />
        </Section>
      </React.Fragment>
    );
  }}
</Playground>

<Props of={Support} />
