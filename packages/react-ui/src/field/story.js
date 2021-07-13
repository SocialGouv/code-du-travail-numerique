import React from "react";
import styled from "styled-components";

import { Euro, Search } from "../icons/index.js";
import { Section } from "../layout/Section/index.js";
import { InputCheckbox } from "./Checkbox.js";
import { Input } from "./Input.js";
import { InputDate } from "./InputDate.js";
import { Label } from "./Label.js";
import { InputRadio } from "./Radio.js";
import { Select } from "./Select.js";
import { Textarea } from "./Textarea.js";

export default {
  component: Select,
  title: "Field/Components",
};

const StyledInput = styled(Input)`
  width: 40rem;
`;

const StyledSelect = styled(Select)`
  width: 100%;
`;

export const base = () => (
  <>
    <Section>
      <Label htmlFor="input">Input</Label>
      <Input name="input" id="input" />
    </Section>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
    <Section>
      <Label htmlFor="select">Select</Label>
      <Select id="select">
        <option />
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
    <Section>
      <Label htmlFor="textarea">Textarea</Label>
      <Textarea name="textarea" id="textarea" />
    </Section>
    <Section>
      <InputCheckbox
        label="Option 1"
        name="checkbox"
        id="option_checkbox_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2 (3rem)"
        name="checkbox"
        id="option_checkbox_2"
        value="option_2"
        size="3rem"
      />
      <InputCheckbox
        label="Option 3 (4rem)"
        name="checkbox"
        id="option_checkbox_3"
        value="option_3"
        size="4rem"
      />
    </Section>
    <Section>
      <InputRadio
        label="Option 1"
        name="radio"
        id="option_radio_1"
        value="option_radio_1"
      />
      <InputRadio
        label="Option 2 (3rem)"
        name="radio"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputRadio
        label="Option 3 (4rem)"
        name="radio"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const checkbox = () => (
  <>
    <Section>
      <InputCheckbox
        label="Option 1 with a very long label so you get what happens when it is on 2 lines"
        name="checkbox"
        id="option_1"
        value="option_1"
      />
      <InputCheckbox
        label="Option 2 (3rem)"
        name="checkbox"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputCheckbox
        label="Option 3 (4rem)"
        name="checkbox"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const input = () => (
  <>
    <Section>
      <Label htmlFor="input">Input normal</Label>
      <Input
        id="input"
        name="input"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec picto 32</Label>
      <Input
        id="input"
        name="input"
        icon={Search}
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec picto currency</Label>
      <StyledInput id="input" name="input" type="number" icon={Euro} />
    </Section>
    <Section>
      <Label htmlFor="input">Input avec texte</Label>
      <Input
        id="input"
        name="input"
        value="Avec texte"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input" autofocus>
        Input Focus
      </Label>
      <Input
        id="input"
        name="input"
        placeholder="Rechercher (Ex : Durée du préavis...)"
      />
    </Section>
    <Section>
      <Label htmlFor="input">Input erreur</Label>
      <Input name="input" id="input" value="Avec texte" invalid={true} />
    </Section>
  </>
);

export const inputDate = () => (
  <>
    <Section>
      <Label htmlFor="input_date">Input Date</Label>
      <InputDate name="input_date" id="input_date" />
    </Section>
  </>
);

export const radio = () => (
  <>
    <Section>
      <InputRadio
        label="Option 1 with a very long label so you get what happens when it is on 2 lines"
        name="radio"
        id="option_1"
        value="option_1"
      />
      <InputRadio
        label="Option 2 (3rem)"
        name="radio"
        id="option_2"
        value="option_2"
        size="3rem"
      />
      <InputRadio
        label="Option 3 (4rem)"
        name="radio"
        id="option_3"
        value="option_3"
        size="4rem"
      />
    </Section>
  </>
);

export const select = () => (
  <>
    <Section>
      <Label htmlFor="select">Select</Label>
      <StyledSelect id="select">
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </StyledSelect>
    </Section>
    <Section>
      <Label htmlFor="select_disabled">Select disabled</Label>
      <Select id="select_disabled" disabled>
        <option>...</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
      </Select>
    </Section>
  </>
);

export const textarea = () => (
  <>
    <Section>
      <Label htmlFor="textarea">Textarea</Label>
      <Textarea name="textarea" id="textarea" />
    </Section>
  </>
);
